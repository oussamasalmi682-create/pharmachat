import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Message, MessageSender, MessageStatus } from '@/lib/data';

// ── Transformation Prisma → format UI ────────────────────────────────────────

function toUIMessage(msg: {
  id: string;
  content: string;
  isSender: boolean;
  status: string;
  createdAt: Date;
}): Message {
  return {
    id:        msg.id,
    content:   msg.content,
    sender:    (msg.isSender ? 'pharmacist' : 'patient') as MessageSender,
    timestamp: msg.createdAt.toISOString(),
    status:    msg.status as MessageStatus,
  };
}

// ── GET /api/patients/[id]/messages ──────────────────────────────────────────
// Utilisé par ChatContainer pour le polling — retourne le format UI

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const rows = await prisma.message.findMany({
      where:   { patientId: id },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(rows.map(toUIMessage));
  } catch (error) {
    console.error('[GET /api/patients/[id]/messages]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// ── POST /api/patients/[id]/messages ─────────────────────────────────────────
// Le pharmacien envoie une réponse — body: { content: string }

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body    = await req.json();
    const content = (body.content ?? '').trim();

    if (!content) {
      return NextResponse.json(
        { error: 'Le contenu du message est requis' },
        { status: 400 }
      );
    }

    const patient = await prisma.patient.findUnique({ where: { id } });
    if (!patient) {
      return NextResponse.json({ error: 'Patient introuvable' }, { status: 404 });
    }

    const row = await prisma.message.create({
      data: {
        content,
        channel:   patient.channel,
        isSender:  true,
        status:    'sent',
        patientId: id,
      },
    });

    await prisma.patient.update({
      where: { id },
      data:  { updatedAt: new Date() },
    });

    // Retourne aussi au format UI pour la mise à jour optimiste
    return NextResponse.json(toUIMessage(row), { status: 201 });
  } catch (error) {
    console.error('[POST /api/patients/[id]/messages]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
