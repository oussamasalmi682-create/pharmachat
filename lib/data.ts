import { prisma } from './prisma';

// ── Types UI (utilisés dans tous les composants) ──────────────────────────────

export type Channel = 'whatsapp' | 'mobile';
export type MessageSender = 'patient' | 'pharmacist';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  content: string;
  sender: MessageSender;
  timestamp: string; // ISO 8601
  status: MessageStatus;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  status: 'online' | 'offline';
  lastSeen: string;
  unreadCount: number;
  medications: string[];
  channel: Channel;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
  avatarColor: string;
}

// ── Transformations Prisma → types UI ────────────────────────────────────────
// Prisma stocke isSender (boolean) et createdAt (Date).
// L'UI attend sender ('patient'|'pharmacist') et timestamp (string ISO).

function toUIMessage(
  msg: {
    id: string;
    content: string;
    isSender: boolean;
    status: string;
    createdAt: Date;
  }
): Message {
  return {
    id:        msg.id,
    content:   msg.content,
    sender:    msg.isSender ? 'pharmacist' : 'patient',
    timestamp: msg.createdAt.toISOString(),
    status:    msg.status as MessageStatus,
  };
}

function formatLastMessageTime(date: Date): string {
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((today.getTime() - msgDay.getTime()) / 86400000);

  if (diffDays === 0) {
    // Aujourd'hui → heure HH:MM
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
  if (diffDays === 1) return 'Hier';
  if (diffDays < 7)   return date.toLocaleDateString('fr-FR', { weekday: 'long' });
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
}

function toUIPatient(
  p: {
    id: string;
    name: string;
    phone: string;
    status: string;
    lastSeen: string;
    unreadCount: number;
    medications: string[];
    channel: string;
    avatarColor: string;
    messages: { id: string; content: string; isSender: boolean; status: string; createdAt: Date }[];
  }
): Patient {
  const sorted   = [...p.messages].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  const lastMsg  = sorted[sorted.length - 1];

  return {
    id:              p.id,
    name:            p.name,
    phone:           p.phone,
    status:          p.status as 'online' | 'offline',
    lastSeen:        p.lastSeen,
    unreadCount:     p.unreadCount,
    medications:     p.medications,
    channel:         p.channel as Channel,
    avatarColor:     p.avatarColor,
    lastMessage:     lastMsg?.content ?? '',
    lastMessageTime: lastMsg ? formatLastMessageTime(lastMsg.createdAt) : '',
    messages:        sorted.map(toUIMessage),
  };
}

// ── Helpers publics (identiques à avant — les composants n'ont rien à changer) ─

export async function getPatients(): Promise<Patient[]> {
  const rows = await prisma.patient.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { messages: true },
  });
  return rows.map(toUIPatient);
}

export async function getPatientById(id: string): Promise<Patient | undefined> {
  // MongoDB ObjectId (ex: "69e218d9...") OU slug (ex: "fatima-zahra-benali")
  // On tente d'abord par id, puis par slug dans le nom
  const row = await prisma.patient.findFirst({
    where: { id },
    include: { messages: true },
  });
  if (!row) return undefined;
  return toUIPatient(row);
}
