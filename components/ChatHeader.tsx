import { Patient } from '@/lib/data';

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

interface ChatHeaderProps {
  patient: Patient;
}

export default function ChatHeader({ patient }: ChatHeaderProps) {
  const initials = getInitials(patient.name);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-100 border-b border-gray-200 flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm select-none"
            style={{ backgroundColor: patient.avatarColor, opacity: 0.9 }}
          >
            {initials}
          </div>
        </div>

        {/* Patient info */}
        <div>
          <h2 className="font-bold text-gray-900 leading-tight">
            {patient.name}
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`text-xs font-medium ${
                patient.status === 'online' ? 'text-green-500' : 'text-gray-500'
              }`}
            >
              {patient.status === 'online' ? 'En ligne' : patient.lastSeen}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-500">{patient.phone}</span>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Medications */}
        <div className="hidden md:flex items-center gap-1.5 mr-2">
          {patient.medications.map((med) => (
            <span
              key={med}
              className="text-xs font-medium text-green-700 bg-green-100 border border-green-200 px-2.5 py-1 rounded-full"
            >
              💊 {med}
            </span>
          ))}
        </div>

        {/* Channel badge / Button */}
        {patient.channel === 'whatsapp' ? (
          <button className="flex items-center gap-1.5 text-sm bg-[#25d366] hover:bg-[#20b858] text-white px-3 py-1.5 rounded-full font-medium mr-2 transition-colors shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>
        ) : (
          <button className="flex items-center gap-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full font-medium mr-2 transition-colors shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
            </svg>
            Mobile
          </button>
        )}

        {/* Action buttons */}
        <button
          className="hover:bg-gray-200 p-2 rounded-full transition-colors text-gray-500"
          title="Rechercher"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button
          className="hover:bg-gray-200 p-2 rounded-full transition-colors text-gray-500"
          title="Plus d'options"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
