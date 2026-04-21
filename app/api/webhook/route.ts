import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getIO } from '@/lib/socket-server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const params = new URLSearchParams(body);

    const from        = params.get('From') ?? '';
    const messageSid  = params.get('MessageSid') ?? '';
    const content     = (params.get('Body') ?? '').trim();
    const profileName = params.get('ProfileName') ?? '';

    console.log('[Webhook] Requête reçue:', { from, messageSid, content, profileName });

    // Twilio envoie "whatsapp:+212XXXXXXXXX" — on supprime le préfixe
    const phone = from.replace('whatsapp:', '');
    const name  = profileName || phone;

    if (!phone || !content) {
      return new NextResponse('', { status: 200 });
    }

    // Évite les doublons (Twilio peut retenter la livraison)
    if (messageSid) {
      const existing = await prisma.message.findFirst({ where: { whatsappId: messageSid } });
      if (existing) return new NextResponse('', { status: 200 });
    }

    // Crée le patient s'il n'existe pas encore (sans upsert pour éviter le besoin de replica set)
    let patient = await prisma.patient.findUnique({ where: { phone } });

    if (patient) {
      patient = await prisma.patient.update({
        where: { phone },
        data:  { status: 'online', updatedAt: new Date() },
      });
    } else {
      patient = await prisma.patient.create({
        data: {
          phone,
          name,
          channel:     'whatsapp',
          status:      'online',
          unreadCount: 0,
          medications: [],
        },
      });
    }

    console.log('[Webhook] Patient OK:', patient.id);

    // Sauvegarde le message
    const message = await prisma.message.create({
      data: {
        content,
        channel:    'whatsapp',
        isSender:   false,
        status:     'delivered',
        whatsappId: messageSid || undefined,
        patientId:  patient.id,
      },
    });

    console.log('[Webhook] Message créé:', message.id);

    // Incrémente les non-lus
    const updated = await prisma.patient.update({
      where: { id: patient.id },
      data:  { unreadCount: patient.unreadCount + 1 },
    });

    const messageForUI = {
      id:        message.id,
      content:   message.content,
      sender:    'patient' as const,
      timestamp: message.createdAt.toISOString(),
      status:    message.status,
    };

    // Émission Socket.io → mise à jour en temps réel dans React
    const io = getIO();
    if (io) {
      io.emit('new_message',   { patientId: patient.id, message: messageForUI });
      io.emit('unread_update', { patientId: patient.id, unreadCount: updated.unreadCount });
    }

    console.log(`[Webhook] ✅ ${name} (${phone}): "${content}"`);

    // Twilio attend une réponse 200 vide
    return new NextResponse('', { status: 200 });

  } catch (error: unknown) {
    console.error('[Webhook] ❌ ERREUR:', error);
    return new NextResponse(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
