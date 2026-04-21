'use client';

import { useState, useRef, useEffect } from 'react';
import { Patient, Message } from '@/lib/data';
import { getSocket } from '@/lib/socket-client';
import QuickActions from './QuickActions';

// ── helpers ──────────────────────────────────────────────────────────────────

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateLabel(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Aujourd'hui";
  if (date.toDateString() === yesterday.toDateString()) return 'Hier';
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function isDifferentDay(a: string, b: string): boolean {
  return new Date(a).toDateString() !== new Date(b).toDateString();
}

// ── status tick icons ─────────────────────────────────────────────────────────

function StatusTick({ status }: { status: Message['status'] }) {
  if (status === 'read') {
    return (
      <span className="text-blue-500 font-bold tracking-tighter text-[10px] ml-1">✓✓</span>
    );
  }
  if (status === 'delivered') {
    return (
      <span className="text-gray-400 font-bold tracking-tighter text-[10px] ml-1">✓✓</span>
    );
  }
  return (
    <span className="text-gray-400 font-bold tracking-tighter text-[10px] ml-1">✓</span>
  );
}

// ── main component ────────────────────────────────────────────────────────────

interface ChatContainerProps {
  patient: Patient;
}

export default function ChatContainer({ patient }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(patient.messages);
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ── Auto-scroll vers le bas à chaque nouveau message ─────────────────────
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ── Reset quand on change de patient ─────────────────────────────────────
  useEffect(() => {
    setMessages(patient.messages);
    setInputValue('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient.id]);

  // ── Socket.io : écoute les nouveaux messages en temps réel ──────────────
  useEffect(() => {
    const socket = getSocket();

    const handleNewMessage = ({ patientId, message }: { patientId: string; message: Message }) => {
      if (patientId !== patient.id) return;
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    };

    socket.on('new_message', handleNewMessage);
    return () => { socket.off('new_message', handleNewMessage); };
  }, [patient.id]);

  // ── Envoi d'un message ────────────────────────────────────────────────────
  const sendMessage = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || sending) return;

    // Mise à jour optimiste : affiche le message immédiatement dans l'UI
    // sans attendre la réponse de l'API (ressenti instantané pour l'utilisateur)
    const tempId = `temp-${Date.now()}`;
    const optimistic: Message = {
      id:        tempId,
      content:   trimmed,
      sender:    'pharmacist',
      timestamp: new Date().toISOString(),
      status:    'sent',
    };
    setMessages((prev) => [...prev, optimistic]);
    setInputValue('');
    inputRef.current?.focus();

    try {
      setSending(true);
      const res = await fetch(`/api/patients/${patient.id}/messages`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ content: trimmed }),
      });

      if (res.ok) {
        const saved: Message = await res.json();
        // Remplace le message temporaire par le message sauvegardé (avec le vrai ID)
        setMessages((prev) =>
          prev.map((m) => (m.id === tempId ? saved : m))
        );
      }
    } catch {
      // En cas d'erreur réseau, le message temp reste visible (pas de suppression)
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div
      className="flex-1 min-h-0 bg-white"
      style={{ display: 'grid', gridTemplateRows: '1fr auto auto' }}
    >
      {/* ── Messages area ── */}
      <div
        ref={scrollRef}
        className="overflow-y-auto px-8 md:px-16 py-6 space-y-3 bg-white"
      >
        {messages.map((msg, index) => {
          const showDateSep =
            index === 0 || isDifferentDay(messages[index - 1].timestamp, msg.timestamp);
          const isPharmacist = msg.sender === 'pharmacist';

          return (
            <div key={msg.id}>
              {/* Date separator */}
              {showDateSep && (
                <div className="flex justify-center my-6">
                  <span className="bg-gray-100 text-gray-500 text-xs px-4 py-1.5 rounded-full font-medium">
                    {formatDateLabel(msg.timestamp)}
                  </span>
                </div>
              )}

              {/* Bubble */}
              <div
                className={`flex ${isPharmacist ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`relative max-w-[70%] px-4 py-3 rounded-xl shadow-sm border ${
                    isPharmacist
                      ? 'bg-green-100 border-green-200/50 rounded-br-sm'
                      : 'bg-gray-100 border-gray-200/50 rounded-bl-sm'
                  }`}
                >
                  {/* Sender label for pharmacist */}
                  {isPharmacist && (
                    <span className="block text-[11px] text-green-700 font-bold mb-1">
                      Vous (Pharmacien)
                    </span>
                  )}

                  {/* Message text */}
                  <p className="text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>

                  {/* Timestamp + status */}
                  <div className="flex items-center gap-1 mt-1 justify-end">
                    <span className="text-[11px] text-gray-500 font-medium">
                      {formatTime(msg.timestamp)}
                    </span>
                    {isPharmacist && <StatusTick status={msg.status} />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Quick Actions ── */}
      <QuickActions onAction={sendMessage} />

      {/* ── Input area ── */}
      <div className="flex items-end gap-3 px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-1 mb-1">
            <button className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors" title="Emoji">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                 <circle cx="12" cy="12" r="10" />
                 <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                 <line x1="9" y1="9" x2="9.01" y2="9" />
                 <line x1="15" y1="9" x2="15.01" y2="9" />
               </svg>
            </button>
            <button className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors" title="Joindre un fichier">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                 <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
               </svg>
            </button>
        </div>

        {/* Text input */}
        <div className="flex-1 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200 focus-within:border-green-400 focus-within:ring-1 focus-within:ring-green-400 transition-all">
          <textarea
            ref={inputRef}
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Écrire un message..."
            className="w-full text-[15px] text-gray-800 placeholder-gray-400 outline-none resize-none bg-transparent leading-relaxed"
          />
        </div>

        {/* Send / Mic button */}
        <div className="mb-0.5">
            {inputValue.trim() ? (
              <button
                onClick={() => sendMessage(inputValue)}
                className="flex-shrink-0 w-11 h-11 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors shadow-sm"
                title="Envoyer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-0.5">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            ) : (
              <button
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors"
                title="Message vocal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
