import { notFound } from 'next/navigation';
import { getPatientById, getPatients } from '@/lib/data';
import ChatHeader from '@/components/ChatHeader';
import ChatContainer from '@/components/ChatContainer';

export const revalidate = 10;

// Pre-generate all patient pages at build time (Next.js 16)
export async function generateStaticParams() {
  const patients = await getPatients();
  return patients.map((p) => ({ patientId: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  const patient = await getPatientById(patientId);
  if (!patient) return { title: 'Patient introuvable' };
  return {
    title: `${patient.name} · PharmaChat`,
    description: `Conversation avec ${patient.name} — ${patient.medications.join(', ')}`,
  };
}

interface ChatPageProps {
  params: Promise<{ patientId: string }>;
}

// Next.js 16 — params is a Promise, must be awaited
export default async function ChatPage({ params }: ChatPageProps) {
  const { patientId } = await params;
  const patient = await getPatientById(patientId);

  if (!patient) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Chat header — Server Component, shows patient info */}
      <ChatHeader patient={patient} />

      {/* Chat body — Client Component, handles messages + input */}
      <ChatContainer patient={patient} />
    </div>
  );
}
