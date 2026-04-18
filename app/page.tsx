import { getPatients } from '@/lib/data';

export default async function HomePage() {
  const patients = await getPatients();
  const totalUnread = patients.reduce((acc, p) => acc + p.unreadCount, 0);
  const onlineCount = patients.filter((p) => p.status === 'online').length;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-[#f0f2f5] to-[#e8ecef] select-none relative overflow-hidden h-full">
      
      {/* Animated Decorative Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[35rem] h-[35rem] bg-[#00a884]/10 rounded-full mix-blend-multiply blur-3xl opacity-80 animate-blob"></div>
        <div className="absolute -bottom-32 -left-32 w-[35rem] h-[35rem] bg-[#25d366]/10 rounded-full mix-blend-multiply blur-3xl opacity-80 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-[#e7f8f3]/30 rounded-full mix-blend-normal blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex flex-col items-center gap-10 text-center px-8 z-10 w-full max-w-xl">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-5 animate-fade-up">
          <div className="relative w-28 h-28 rounded-full p-1.5 bg-gradient-to-tr from-[#00a884] to-[#25d366] shadow-[0_15px_35px_rgba(0,168,132,0.35)] group hover:scale-105 transition-transform duration-500 ease-out">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#00a884]/10 to-transparent"></div>
               <span className="text-6xl relative z-10 drop-shadow-sm group-hover:animate-bounce-subtle">💊</span>
            </div>
          </div>
          <div>
            <h1 className="text-[40px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#111b21] to-[#3a4a52] tracking-tight">PharmaChat</h1>
            <p className="text-[15px] font-semibold text-[#667781] mt-1 tracking-[0.1em] uppercase">Gestion des demandes médicaments</p>
          </div>
        </div>

        {/* Stats Section with Glassmorphism */}
        <div className="flex justify-between items-center w-full bg-white/70 backdrop-blur-xl rounded-2xl p-6 px-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white/60 animate-fade-up animation-delay-150">
          <div className="flex flex-col items-center flex-1">
            <span className="text-3xl font-extrabold text-[#111b21]">{patients.length}</span>
            <span className="text-[13px] font-semibold text-[#667781] uppercase tracking-wider mt-1">Patients</span>
          </div>
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#d1d7db] to-transparent mx-2" />
          <div className="flex flex-col items-center flex-1">
            <div className="relative">
              <span className="text-3xl font-extrabold text-[#25d366] drop-shadow-sm">{onlineCount}</span>
              <span className="absolute -top-1 -right-3 w-3 h-3 bg-[#25d366] rounded-full ring-4 ring-white shadow-sm animate-pulse"></span>
            </div>
            <span className="text-[13px] font-semibold text-[#667781] uppercase tracking-wider mt-1">En ligne</span>
          </div>
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#d1d7db] to-transparent mx-2" />
          <div className="flex flex-col items-center flex-1">
            <span className="text-3xl font-extrabold text-[#f59e0b] drop-shadow-sm">{totalUnread}</span>
            <span className="text-[13px] font-semibold text-[#667781] uppercase tracking-wider mt-1">Non lus</span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] border border-white/80 w-full hover:shadow-[0_25px_50px_-12px_rgba(0,168,132,0.15)] transition-all duration-500 animate-fade-up animation-delay-300 relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#e7f8f3] to-transparent rounded-bl-full opacity-60 -z-10 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"></div>
          
          <div className="flex items-center gap-5 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#00a884] to-[#008f6f] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00a884]/30 transform -rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xl font-bold text-[#111b21]">Sélectionnez un patient</p>
              <p className="text-[15px] text-[#667781] mt-0.5">pour démarrer ou reprendre une conversation</p>
            </div>
          </div>

          <div className="space-y-4 pt-5 border-t border-gray-200/60">
            <div className="flex items-center gap-4 text-[15px] font-medium text-[#54656f]">
              <div className="w-8 h-8 rounded-full bg-[#25d366]/10 flex items-center justify-center flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#25d366]"></span>
              </div>
              Canaux supportés : WhatsApp & Application mobile
            </div>
            <div className="flex items-center gap-4 text-[15px] font-medium text-[#54656f]">
              <div className="w-8 h-8 rounded-full bg-[#00a884]/10 flex items-center justify-center flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00a884]"></span>
              </div>
              Réponses rapides : Disponible, Rupture, Ordonnance...
            </div>
            <div className="flex items-center gap-4 text-[15px] font-medium text-[#54656f]">
              <div className="w-8 h-8 rounded-full bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></span>
              </div>
              Suivi des médicaments personnalisé par patient
            </div>
          </div>
        </div>

        <div className="text-[14px] font-medium text-[#8696a0] flex items-center justify-center gap-2.5 animate-fade-up animation-delay-450 bg-[#eef1f3] px-4 py-2 rounded-full shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          Chiffrement de bout en bout · Données sécurisées
        </div>
      </div>
    </div>
  );
}
