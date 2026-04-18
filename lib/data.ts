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

export const patients: Patient[] = [
  {
    id: 'fatima-zahra-benali',
    name: 'Fatima Zahra Benali',
    phone: '+212 6 12 34 56 78',
    status: 'online',
    lastSeen: 'En ligne',
    unreadCount: 3,
    medications: ['Paracétamol 1000mg', 'Amoxicilline 500mg'],
    channel: 'whatsapp',
    lastMessage: "Est-ce que vous avez encore de l'Amoxicilline?",
    lastMessageTime: '10:42',
    avatarColor: '#6366f1',
    messages: [
      {
        id: 'm1',
        content: "Bonjour docteur, j'aimerais commander du Paracétamol 1000mg pour ma migraine.",
        sender: 'patient',
        timestamp: '2026-04-15T09:30:00Z',
        status: 'read',
      },
      {
        id: 'm2',
        content:
          'Bonjour Madame Benali! Bien sûr, nous avons le Paracétamol 1000mg en stock. Combien de boîtes souhaitez-vous?',
        sender: 'pharmacist',
        timestamp: '2026-04-15T09:32:00Z',
        status: 'read',
      },
      {
        id: 'm3',
        content:
          "J'en voudrais 2 boîtes s'il vous plaît. Et est-ce que j'ai besoin d'une ordonnance?",
        sender: 'patient',
        timestamp: '2026-04-15T09:33:00Z',
        status: 'read',
      },
      {
        id: 'm4',
        content:
          "Non, le Paracétamol ne nécessite pas d'ordonnance. Votre commande de 2 boîtes est prête. Vous pouvez passer la chercher à partir de 14h.",
        sender: 'pharmacist',
        timestamp: '2026-04-15T09:35:00Z',
        status: 'read',
      },
      {
        id: 'm5',
        content: "Est-ce que vous avez encore de l'Amoxicilline?",
        sender: 'patient',
        timestamp: '2026-04-15T10:42:00Z',
        status: 'delivered',
      },
    ],
  },
  {
    id: 'youssef-el-mansouri',
    name: 'Youssef El Mansouri',
    phone: '+212 6 98 76 54 32',
    status: 'online',
    lastSeen: 'En ligne',
    unreadCount: 1,
    medications: ['Metformine 500mg', 'Losartan 50mg', 'Aspirine 100mg'],
    channel: 'mobile',
    lastMessage: "J'ai besoin de renouveler mon ordonnance pour la Metformine.",
    lastMessageTime: '09:15',
    avatarColor: '#f59e0b',
    messages: [
      {
        id: 'm1',
        content: "Bonjour, j'ai besoin de renouveler mon traitement diabétique.",
        sender: 'patient',
        timestamp: '2026-04-15T08:00:00Z',
        status: 'read',
      },
      {
        id: 'm2',
        content: 'Bonjour Monsieur El Mansouri. Quel médicament souhaitez-vous renouveler?',
        sender: 'pharmacist',
        timestamp: '2026-04-15T08:05:00Z',
        status: 'read',
      },
      {
        id: 'm3',
        content: 'La Metformine 500mg. Mon médecin m\'a prescrit 2 comprimés par jour.',
        sender: 'patient',
        timestamp: '2026-04-15T08:10:00Z',
        status: 'read',
      },
      {
        id: 'm4',
        content:
          "Pour la Metformine, nous avons besoin d'une ordonnance valide. Pouvez-vous nous envoyer une photo de votre ordonnance?",
        sender: 'pharmacist',
        timestamp: '2026-04-15T08:12:00Z',
        status: 'read',
      },
      {
        id: 'm5',
        content: "J'ai besoin de renouveler mon ordonnance pour la Metformine.",
        sender: 'patient',
        timestamp: '2026-04-15T09:15:00Z',
        status: 'delivered',
      },
    ],
  },
  {
    id: 'nadia-cherkaoui',
    name: 'Nadia Cherkaoui',
    phone: '+212 6 55 44 33 22',
    status: 'offline',
    lastSeen: 'Vu à 08:30',
    unreadCount: 0,
    medications: ['Augmentin 875mg', 'Ibuprofène 400mg'],
    channel: 'whatsapp',
    lastMessage: 'Merci, je passerai chercher ce soir.',
    lastMessageTime: 'Hier',
    avatarColor: '#ec4899',
    messages: [
      {
        id: 'm1',
        content: "Bonjour, est-ce que l'Augmentin 875mg est disponible?",
        sender: 'patient',
        timestamp: '2026-04-14T14:00:00Z',
        status: 'read',
      },
      {
        id: 'm2',
        content:
          "Oui, l'Augmentin 875mg est disponible. Il vous faut une ordonnance médicale pour cet antibiotique.",
        sender: 'pharmacist',
        timestamp: '2026-04-14T14:05:00Z',
        status: 'read',
      },
      {
        id: 'm3',
        content: "Parfait, j'ai mon ordonnance. Est-ce que vous avez aussi de l'Ibuprofène 400mg?",
        sender: 'patient',
        timestamp: '2026-04-14T14:08:00Z',
        status: 'read',
      },
      {
        id: 'm4',
        content:
          "Oui, l'Ibuprofène est disponible sans ordonnance. Je prépare votre commande.",
        sender: 'pharmacist',
        timestamp: '2026-04-14T14:10:00Z',
        status: 'read',
      },
      {
        id: 'm5',
        content: 'Merci, je passerai chercher ce soir.',
        sender: 'patient',
        timestamp: '2026-04-14T14:15:00Z',
        status: 'read',
      },
    ],
  },
  {
    id: 'hassan-alaoui',
    name: 'Hassan Alaoui',
    phone: '+212 6 77 88 99 00',
    status: 'online',
    lastSeen: 'En ligne',
    unreadCount: 5,
    medications: ['Oméprazole 20mg', 'Doliprane 1000mg', 'Spasfon'],
    channel: 'whatsapp',
    lastMessage: "Le médecin m'a aussi prescrit du Spasfon, vous l'avez?",
    lastMessageTime: '11:20',
    avatarColor: '#10b981',
    messages: [
      {
        id: 'm1',
        content: "Bonjour! J'ai des douleurs gastriques depuis hier soir. Qu'est-ce que vous me conseillez?",
        sender: 'patient',
        timestamp: '2026-04-15T10:00:00Z',
        status: 'read',
      },
      {
        id: 'm2',
        content:
          "Bonjour Monsieur Alaoui. Je vous recommande l'Oméprazole 20mg pour les douleurs gastriques. Avez-vous une ordonnance?",
        sender: 'pharmacist',
        timestamp: '2026-04-15T10:05:00Z',
        status: 'read',
      },
      {
        id: 'm3',
        content:
          "Oui j'ai une ordonnance. Mon médecin a prescrit l'Oméprazole et le Doliprane pour la douleur.",
        sender: 'patient',
        timestamp: '2026-04-15T10:10:00Z',
        status: 'read',
      },
      {
        id: 'm4',
        content:
          "Très bien. Nous avons l'Oméprazole 20mg et le Doliprane 1000mg en stock. Je prépare votre commande.",
        sender: 'pharmacist',
        timestamp: '2026-04-15T10:15:00Z',
        status: 'read',
      },
      {
        id: 'm5',
        content: "Le médecin m'a aussi prescrit du Spasfon, vous l'avez?",
        sender: 'patient',
        timestamp: '2026-04-15T11:20:00Z',
        status: 'delivered',
      },
    ],
  },
  {
    id: 'samira-tahiri',
    name: 'Samira Tahiri',
    phone: '+212 6 11 22 33 44',
    status: 'offline',
    lastSeen: 'Vu à 07:45',
    unreadCount: 0,
    medications: ['Levothyrox 75mcg', 'Vitamine D3'],
    channel: 'mobile',
    lastMessage: "D'accord, je prendrai rendez-vous avec mon médecin.",
    lastMessageTime: 'Lundi',
    avatarColor: '#3b82f6',
    messages: [
      {
        id: 'm1',
        content:
          "Bonjour, puis-je obtenir du Levothyrox 75mcg sans ordonnance? J'ai perdu la mienne.",
        sender: 'patient',
        timestamp: '2026-04-13T09:00:00Z',
        status: 'read',
      },
      {
        id: 'm2',
        content:
          "Bonjour Madame Tahiri. Malheureusement, le Levothyrox est un médicament à prescription obligatoire. Il vous faut une ordonnance valide.",
        sender: 'pharmacist',
        timestamp: '2026-04-13T09:05:00Z',
        status: 'read',
      },
      {
        id: 'm3',
        content: "Je comprends. Et pour la Vitamine D3, est-ce disponible?",
        sender: 'patient',
        timestamp: '2026-04-13T09:10:00Z',
        status: 'read',
      },
      {
        id: 'm4',
        content:
          "Oui, la Vitamine D3 est disponible sans ordonnance. Pour le Levothyrox, je vous conseille de consulter votre médecin pour une nouvelle ordonnance.",
        sender: 'pharmacist',
        timestamp: '2026-04-13T09:12:00Z',
        status: 'read',
      },
      {
        id: 'm5',
        content: "D'accord, je prendrai rendez-vous avec mon médecin.",
        sender: 'patient',
        timestamp: '2026-04-13T09:20:00Z',
        status: 'read',
      },
    ],
  },
  {
    id: 'omar-benhaddou',
    name: 'Omar Benhaddou',
    phone: '+212 6 55 66 77 88',
    status: 'online',
    lastSeen: 'En ligne',
    unreadCount: 2,
    medications: ['Ventoline', 'Flixotide 250mcg'],
    channel: 'whatsapp',
    lastMessage: "Est-ce que la Ventoline est disponible? J'ai une crise d'asthme.",
    lastMessageTime: '10:58',
    avatarColor: '#8b5cf6',
    messages: [
      {
        id: 'm1',
        content: "URGENT: Est-ce que la Ventoline est disponible? J'ai une crise d'asthme.",
        sender: 'patient',
        timestamp: '2026-04-15T10:55:00Z',
        status: 'delivered',
      },
      {
        id: 'm2',
        content: "Est-ce que la Ventoline est disponible? J'ai une crise d'asthme.",
        sender: 'patient',
        timestamp: '2026-04-15T10:58:00Z',
        status: 'delivered',
      },
    ],
  },
  {
    id: 'amina-kettani',
    name: 'Amina Kettani',
    phone: '+212 6 99 88 77 66',
    status: 'offline',
    lastSeen: 'Vu à 15:30 hier',
    unreadCount: 0,
    medications: ['Gel Voltaren', 'Doliprane 500mg'],
    channel: 'mobile',
    lastMessage: "Super! Je vais passer dans l'après-midi.",
    lastMessageTime: 'Hier',
    avatarColor: '#f97316',
    messages: [
      {
        id: 'm1',
        content: "Bonjour, j'ai mal au genou suite à une chute. Qu'est-ce que vous me recommandez?",
        sender: 'patient',
        timestamp: '2026-04-14T11:00:00Z',
        status: 'read',
      },
      {
        id: 'm2',
        content:
          "Bonjour Madame Kettani. Pour une douleur articulaire, je vous recommande le Gel Voltaren en application locale et un antalgique comme le Doliprane 500mg.",
        sender: 'pharmacist',
        timestamp: '2026-04-14T11:05:00Z',
        status: 'read',
      },
      {
        id: 'm3',
        content: 'Merci! Vous les avez tous les deux en stock?',
        sender: 'patient',
        timestamp: '2026-04-14T11:08:00Z',
        status: 'read',
      },
      {
        id: 'm4',
        content:
          "Oui, les deux sont disponibles. Le Gel Voltaren et le Doliprane ne nécessitent pas d'ordonnance.",
        sender: 'pharmacist',
        timestamp: '2026-04-14T11:10:00Z',
        status: 'read',
      },
      {
        id: 'm5',
        content: "Super! Je vais passer dans l'après-midi.",
        sender: 'patient',
        timestamp: '2026-04-14T11:15:00Z',
        status: 'read',
      },
    ],
  },
  {
    id: 'rachid-sebbar',
    name: 'Rachid Sebbar',
    phone: '+212 6 44 33 22 11',
    status: 'online',
    lastSeen: 'En ligne',
    unreadCount: 0,
    medications: ['Inexium 40mg', 'Bisoprolol 5mg'],
    channel: 'whatsapp',
    lastMessage: 'Parfait, merci pour votre aide!',
    lastMessageTime: '08:45',
    avatarColor: '#06b6d4',
    messages: [
      {
        id: 'm1',
        content:
          "Bonjour, j'ai besoin de mon traitement cardiaque habituel. Inexium 40mg et Bisoprolol 5mg.",
        sender: 'patient',
        timestamp: '2026-04-15T08:30:00Z',
        status: 'read',
      },
      {
        id: 'm2',
        content:
          "Bonjour Monsieur Sebbar! Avez-vous votre ordonnance? Ces deux médicaments nécessitent une prescription.",
        sender: 'pharmacist',
        timestamp: '2026-04-15T08:35:00Z',
        status: 'read',
      },
      {
        id: 'm3',
        content:
          "Oui, j'ai mon ordonnance renouvelée par mon cardiologue la semaine dernière.",
        sender: 'patient',
        timestamp: '2026-04-15T08:40:00Z',
        status: 'read',
      },
      {
        id: 'm4',
        content:
          'Parfait! Nous avons les deux médicaments en stock. Votre commande sera prête dans 15 minutes.',
        sender: 'pharmacist',
        timestamp: '2026-04-15T08:42:00Z',
        status: 'read',
      },
      {
        id: 'm5',
        content: 'Parfait, merci pour votre aide!',
        sender: 'patient',
        timestamp: '2026-04-15T08:45:00Z',
        status: 'read',
      },
    ],
  },
];

// Simulated async data fetching (as if calling an API)
export async function getPatients(): Promise<Patient[]> {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return patients;
}

export async function getPatientById(id: string): Promise<Patient | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return patients.find((p) => p.id === id);
}
