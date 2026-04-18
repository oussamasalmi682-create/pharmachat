import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

// ── Types pour le payload WhatsApp Cloud API ──────────────────────────────────

interface WhatsAppTextMessage {
  id: string;           // "wamid.xxx" — ID unique côté Meta
  from: string;         // numéro du patient ex: "212612345678"
  timestamp: string;    // Unix timestamp en string ex: "1713180000"
  type: 'text';
  text: { body: string };
}

interface WhatsAppContact {
  profile: { name: string };
  wa_id: string;
}

interface WhatsAppWebhookPayload {
  object: string;
  entry: Array<{
    changes: Array<{
      field: string;
      value: {
        messaging_product: string;
        contacts?: WhatsAppContact[];
        messages?: WhatsAppTextMessage[];
      };
    }>;
  }>;
}

// ── Vérification de signature HMAC-SHA256 ────────────────────────────────────
// Meta signe chaque requête POST avec APP_SECRET pour prouver son authenticité.
// Sans cette vérification, n'importe qui pourrait envoyer de faux messages.

function verifySignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;

  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) {
    console.error('WHATSAPP_APP_SECRET manquant dans .env');
    return false;
  }

  // Meta envoie : "sha256=abc123..."  — on enlève le préfixe "sha256="
  const expected = `sha256=${crypto
    .createHmac('sha256', appSecret)
    .update(rawBody)
    .digest('hex')}`;

  // timingSafeEqual évite les timing attacks (comparaison en temps constant)
  // Les deux buffers doivent avoir la même longueur sinon ça lance une exception
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);

  if (sigBuf.length !== expBuf.length) return false;

  return crypto.timingSafeEqual(sigBuf, expBuf);
}

// ── GET /api/webhook — Vérification initiale Meta ────────────────────────────
// Meta appelle cette route une seule fois lors de la configuration du webhook.
// Il envoie un "challenge" que tu dois renvoyer pour prouver que tu contrôles ce serveur.

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode      = searchParams.get('hub.mode');
  const token     = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Meta attend exactement ton WHATSAPP_VERIFY_TOKEN
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('[Webhook] Vérification Meta réussie');
    // On renvoie le challenge en texte brut — Meta confirme que le webhook est valide
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn('[Webhook] Vérification échouée — token invalide');
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// ── POST /api/webhook — Réception des messages WhatsApp ──────────────────────

export async function POST(req: NextRequest) {
  // 1. Lire le body en texte brut AVANT tout parsing
  //    (la signature est calculée sur le body brut — un JSON.parse + re-serialize
  //    changerait l'ordre des clés et invaliderait la signature)
  const rawBody = await req.text();

  // ⚠️ TEMP: Signature désactivée pour tester avec REST Client — RÉACTIVER avant production !
  // const signature = req.headers.get('x-hub-signature-256');
  // if (!verifySignature(rawBody, signature)) {
  //   console.warn('[Webhook] Signature invalide — requête rejetée');
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    await processWebhook(rawBody);
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (err) {
    console.error('[Webhook] Erreur:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ── Traitement du payload WhatsApp ───────────────────────────────────────────

async function processWebhook(rawBody: string) {
  const payload = JSON.parse(rawBody) as WhatsAppWebhookPayload;

  // Parcourt les entrées (peut y en avoir plusieurs dans un seul POST)
  for (const entry of payload.entry) {
    for (const change of entry.changes) {

      // On ne traite que les événements "messages" — pas les statuts de livraison
      if (change.field !== 'messages') continue;

      const { messages, contacts } = change.value;

      // Ignorer si pas de messages (ex: événement de statut "lu", "livré")
      if (!messages || messages.length === 0) continue;

      for (const msg of messages) {

        // On ne gère que les messages texte pour l'instant
        if (msg.type !== 'text') {
          console.log(`[Webhook] Type ignoré: ${msg.type}`);
          continue;
        }

        const phone   = `+${msg.from}`;  // Meta envoie sans le "+" — on l'ajoute
        const name    = contacts?.[0]?.profile?.name ?? phone;
        const content = msg.text.body;
        const whatsappId = msg.id;       // "wamid.xxx" — unique par message

        // upsert = crée le patient s'il n'existe pas, sinon le récupère
        // Utile pour les nouveaux patients qui écrivent pour la 1ère fois
        const patient = await prisma.patient.upsert({
          where:  { phone },
          update: { status: 'online', updatedAt: new Date() },
          create: {
            phone,
            name,
            channel:     'whatsapp',
            status:      'online',
            unreadCount: 0,
            medications: [],
          },
        });

        // Evite les doublons si Meta renvoi le même événement (retry)
        const existing = await prisma.message.findUnique({
          where: { whatsappId },
        });
        if (existing) {
          console.log(`[Webhook] Message déjà traité: ${whatsappId}`);
          continue;
        }

        // Créer le message en base
        await prisma.message.create({
          data: {
            content,
            channel:    'whatsapp',
            isSender:   false,       // false = vient du patient
            status:     'delivered',
            whatsappId,
            patientId:  patient.id,
          },
        });

        // Incrémenter le compteur de non-lus du patient
        await prisma.patient.update({
          where: { id: patient.id },
          data:  { unreadCount: { increment: 1 } },
        });

        console.log(`[Webhook] Message sauvegardé — ${name} (${phone}): "${content}"`);
      }
    }
  }
}
