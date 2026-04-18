import { getPatients } from '@/lib/data';
import SidebarClient from './SidebarClient';

// Server Component — simulates async data fetching from a database/API
export default async function Sidebar() {
  const patients = await getPatients();

  return (
    <aside className="w-[360px] flex-shrink-0 flex flex-col min-h-0 border-r border-[#d1d7db] overflow-hidden">
      <SidebarClient patients={patients} />
    </aside>
  );
}
