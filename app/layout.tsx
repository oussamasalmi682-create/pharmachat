import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'PharmaChat — Gestion des demandes médicaments',
  description:
    'Interface de gestion des demandes de médicaments par canal WhatsApp et Mobile pour pharmaciens.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="h-[100dvh] w-screen flex overflow-hidden bg-[#f0f2f5]">
        {/* Sidebar — Server Component with async data fetching */}
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
