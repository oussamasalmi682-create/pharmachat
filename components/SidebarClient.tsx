'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Patient } from '@/lib/data';

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function ChannelBadge({ channel }: { channel: 'whatsapp' | 'mobile' }) {
  if (channel === 'whatsapp') {
    return (
      <span className="flex-shrink-0 text-[#25d366] ml-1" title="WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex-shrink-0 text-blue-500 ml-1" title="Application Mobile">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
       </svg>
    </span>
  );
}

export default function SidebarClient({ patients }: { patients: Patient[] }) {
  const [search, setSearch] = useState('');
  const pathname = usePathname();

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.medications.some((m) => m.toLowerCase().includes(search.toLowerCase()))
  );

  const totalUnread = patients.reduce((acc, p) => acc + p.unreadCount, 0);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="font-bold text-gray-900 text-lg leading-tight">PharmaChat</h1>
            <p className="text-xs text-gray-400 font-medium tracking-wide border-t border-transparent">Pharmacien</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {totalUnread > 0 && (
             <div className="relative flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-gray-100">
                  {totalUnread > 99 ? '99+' : totalUnread}
                </span>
             </div>
          )}
          <button className="hover:bg-gray-200 p-2 rounded-full transition-colors text-gray-500" title="Filtrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-3 py-3 bg-gray-100">
        <div className="flex items-center bg-white rounded-full px-4 py-2 gap-2 border border-gray-200 shadow-sm focus-within:ring-1 focus-within:ring-green-400 focus-within:border-green-400 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-sm">Aucun patient trouvé</p>
          </div>
        ) : (
          filtered.map((patient) => {
            const isActive = pathname === `/chat/${patient.id}`;
            const initials = getInitials(patient.name);

            return (
              <Link
                key={patient.id}
                href={`/chat/${patient.id}`}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  isActive ? 'bg-gray-200' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm select-none"
                    style={{ backgroundColor: patient.avatarColor, opacity: 0.9 }}
                  >
                    {initials}
                  </div>
                </div>

                {/* Info Container */}
                <div className="flex-1 min-w-0 border-b border-gray-100 pb-1 h-12 flex flex-col justify-center">
                  {/* Row 1: Name & Time */}
                  <div className="flex items-center justify-between">
                     <span className="font-bold text-[15px] text-gray-900 truncate">
                        {patient.name}
                     </span>
                     <span className={`text-xs ml-2 flex-shrink-0 font-medium ${patient.unreadCount > 0 ? 'text-green-500' : 'text-gray-400'}`}>
                        {patient.lastMessageTime}
                     </span>
                  </div>

                  {/* Row 2: Medication & Notification */}
                  <div className="flex justify-between items-center mt-0.5">
                      <div className="flex items-center gap-1.5 truncate">
                         {/* Badge Médicament */}
                         {patient.medications[0] && (
                           <span className="text-[11px] bg-green-100 text-green-700 px-1.5 py-[1px] rounded-md truncate max-w-[120px] font-medium border border-green-200">
                             💊 {patient.medications[0]}
                           </span>
                         )}
                         
                         {/* Last message preview */}
                         <p className="text-[13px] text-gray-500 truncate flex-1 flex items-center">
                           <ChannelBadge channel={patient.channel} /> 
                           <span className="ml-1 truncate">{patient.lastMessage}</span>
                         </p>
                      </div>

                      {/* Unread Badge */}
                      {patient.unreadCount > 0 && (
                        <div className="flex-shrink-0 ml-2">
                           <span className="bg-green-500 text-white text-[11px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 shadow-sm">
                             {patient.unreadCount}
                           </span>
                        </div>
                      )}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
