import { NextResponse } from 'next/server';
import { getPatients } from '@/lib/data';

// Retourne les patients au format UI (transformé par lib/data.ts)
// Utilisé par SidebarClient pour le polling des unread counts
export async function GET() {
  try {
    const patients = await getPatients();
    return NextResponse.json(patients);
  } catch (error) {
    console.error('[GET /api/patients]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
