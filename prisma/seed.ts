import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PATIENTS = [
  {
    phone: '+212612345678',
    name: 'Fatima Zahra Benali',
    channel: 'whatsapp',
    status: 'online',
    lastSeen: 'En ligne',
    unreadCount: 3,
    medications: ['Paracétamol 1000mg', 'Amoxicilline 500mg'],
    avatarColor: '#6366f1',
    messages: [
      { content: "Bonjour docteur, j'aimerais commander du Paracétamol 1000mg.", isSender: false, status: 'read' },
      { content: 'Bonjour Madame Benali! Nous avons le Paracétamol en stock. Combien de boîtes ?', isSender: true, status: 'read' },
      { content: "J'en voudrais 2 boîtes. Ai-je besoin d'une ordonnance ?", isSender: false, status: 'read' },
      { content: "Non, le Paracétamol ne nécessite pas d'ordonnance. Commande prête à 14h.", isSender: true, status: 'read' },
      { content: "Est-ce que vous avez encore de l'Amoxicilline ?", isSender: false, status: 'delivered' },
    ],
  },
  {
    phone: '+212698765432',
    name: 'Youssef El Mansouri',
    channel: 'mobile',
    status: 'online',
    lastSeen: 'En ligne',
    unreadCount: 1,
    medications: ['Metformine 500mg', 'Losartan 50mg', 'Aspirine 100mg'],
    avatarColor: '#f59e0b',
    messages: [
      { content: "Bonjour, j'ai besoin de renouveler mon traitement diabétique.", isSender: false, status: 'read' },
      { content: 'Bonjour Monsieur El Mansouri. Quel médicament souhaitez-vous renouveler ?', isSender: true, status: 'read' },
      { content: 'La Metformine 500mg, 2 comprimés par jour.', isSender: false, status: 'read' },
      { content: "Pour la Metformine, nous avons besoin d'une ordonnance. Pouvez-vous envoyer une photo ?", isSender: true, status: 'read' },
      { content: "J'ai besoin de renouveler mon ordonnance pour la Metformine.", isSender: false, status: 'delivered' },
    ],
  },
  {
    phone: '+212655443322',
    name: 'Nadia Cherkaoui',
    channel: 'whatsapp',
    status: 'offline',
    lastSeen: 'Vu à 08:30',
    unreadCount: 0,
    medications: ['Augmentin 875mg', 'Ibuprofène 400mg'],
    avatarColor: '#ec4899',
    messages: [
      { content: "Bonjour, est-ce que l'Augmentin 875mg est disponible ?", isSender: false, status: 'read' },
      { content: "Oui, l'Augmentin est disponible. Il faut une ordonnance.", isSender: true, status: 'read' },
      { content: "Parfait, j'ai mon ordonnance. Vous avez aussi de l'Ibuprofène ?", isSender: false, status: 'read' },
      { content: "Oui, l'Ibuprofène est disponible sans ordonnance. Je prépare votre commande.", isSender: true, status: 'read' },
      { content: 'Merci, je passerai chercher ce soir.', isSender: false, status: 'read' },
    ],
  },
  {
    phone: '+212677889900',
    name: 'Hassan Alaoui',
    channel: 'whatsapp',
    status: 'online',
    lastSeen: 'En ligne',
    unreadCount: 5,
    medications: ['Oméprazole 20mg', 'Doliprane 1000mg', 'Spasfon'],
    avatarColor: '#10b981',
    messages: [
      { content: "Bonjour ! J'ai des douleurs gastriques depuis hier soir.", isSender: false, status: 'read' },
      { content: "Bonjour Monsieur Alaoui. Je vous recommande l'Oméprazole 20mg. Avez-vous une ordonnance ?", isSender: true, status: 'read' },
      { content: "Oui, mon médecin a prescrit l'Oméprazole et le Doliprane.", isSender: false, status: 'read' },
      { content: "Nous avons les deux en stock. Je prépare votre commande.", isSender: true, status: 'read' },
      { content: "Le médecin m'a aussi prescrit du Spasfon, vous l'avez ?", isSender: false, status: 'delivered' },
    ],
  },
  {
    phone: '+212611223344',
    name: 'Samira Tahiri',
    channel: 'mobile',
    status: 'offline',
    lastSeen: 'Vu à 07:45',
    unreadCount: 0,
    medications: ['Levothyrox 75mcg', 'Vitamine D3'],
    avatarColor: '#3b82f6',
    messages: [
      { content: "Bonjour, puis-je obtenir du Levothyrox 75mcg sans ordonnance ?", isSender: false, status: 'read' },
      { content: "Bonjour Madame Tahiri. Le Levothyrox est à prescription obligatoire.", isSender: true, status: 'read' },
      { content: "Je comprends. Et pour la Vitamine D3 ?", isSender: false, status: 'read' },
      { content: "La Vitamine D3 est disponible sans ordonnance.", isSender: true, status: 'read' },
      { content: "D'accord, je prendrai rendez-vous avec mon médecin.", isSender: false, status: 'read' },
    ],
  },
  {
    phone: '+212655667788',
    name: 'Omar Benhaddou',
    channel: 'whatsapp',
    status: 'online',
    lastSeen: 'En ligne',
    unreadCount: 2,
    medications: ['Ventoline', 'Flixotide 250mcg'],
    avatarColor: '#8b5cf6',
    messages: [
      { content: "URGENT: Est-ce que la Ventoline est disponible ? J'ai une crise d'asthme.", isSender: false, status: 'delivered' },
      { content: "Est-ce que la Ventoline est disponible ? J'ai une crise d'asthme.", isSender: false, status: 'delivered' },
    ],
  },
  {
    phone: '+212699887766',
    name: 'Amina Kettani',
    channel: 'mobile',
    status: 'offline',
    lastSeen: 'Vu à 15:30 hier',
    unreadCount: 0,
    medications: ['Gel Voltaren', 'Doliprane 500mg'],
    avatarColor: '#f97316',
    messages: [
      { content: "Bonjour, j'ai mal au genou suite à une chute. Que me recommandez-vous ?", isSender: false, status: 'read' },
      { content: "Bonjour Madame Kettani. Je vous recommande le Gel Voltaren et le Doliprane 500mg.", isSender: true, status: 'read' },
      { content: 'Vous les avez tous les deux en stock ?', isSender: false, status: 'read' },
      { content: "Oui, les deux sont disponibles sans ordonnance.", isSender: true, status: 'read' },
      { content: "Super ! Je vais passer dans l'après-midi.", isSender: false, status: 'read' },
    ],
  },
  {
    phone: '+212644332211',
    name: 'Rachid Sebbar',
    channel: 'whatsapp',
    status: 'online',
    lastSeen: 'En ligne',
    unreadCount: 0,
    medications: ['Inexium 40mg', 'Bisoprolol 5mg'],
    avatarColor: '#06b6d4',
    messages: [
      { content: "Bonjour, j'ai besoin de mon traitement cardiaque. Inexium 40mg et Bisoprolol 5mg.", isSender: false, status: 'read' },
      { content: "Bonjour Monsieur Sebbar ! Avez-vous votre ordonnance ?", isSender: true, status: 'read' },
      { content: "Oui, ordonnance renouvelée par mon cardiologue la semaine dernière.", isSender: false, status: 'read' },
      { content: 'Parfait ! Votre commande sera prête dans 15 minutes.', isSender: true, status: 'read' },
      { content: 'Parfait, merci pour votre aide !', isSender: false, status: 'read' },
    ],
  },
];

async function main() {
  console.log('Suppression des données existantes...');
  await prisma.message.deleteMany();
  await prisma.patient.deleteMany();

  console.log('Insertion des 8 patients...');

  // On décale les timestamps pour simuler des conversations à des heures différentes
  const baseTime = new Date('2026-04-15T08:00:00Z');

  for (let pi = 0; pi < PATIENTS.length; pi++) {
    const data = PATIENTS[pi];

    const patient = await prisma.patient.create({
      data: {
        phone:       data.phone,
        name:        data.name,
        channel:     data.channel,
        status:      data.status,
        lastSeen:    data.lastSeen,
        unreadCount: data.unreadCount,
        medications: data.medications,
        avatarColor: data.avatarColor,
      },
    });

    for (let mi = 0; mi < data.messages.length; mi++) {
      const msg = data.messages[mi];
      const msgTime = new Date(baseTime.getTime() + pi * 3600000 + mi * 300000);

      await prisma.message.create({
        data: {
          content:    msg.content,
          channel:    data.channel,
          isSender:   msg.isSender,
          status:     msg.status,
          patientId:  patient.id,
          createdAt:  msgTime,
          whatsappId: `seed_p${pi}_m${mi}`,
        },
      });
    }

    // updatedAt = timestamp du dernier message
    const lastMsgTime = new Date(baseTime.getTime() + pi * 3600000 + (data.messages.length - 1) * 300000);
    await prisma.patient.update({
      where: { id: patient.id },
      data:  { updatedAt: lastMsgTime },
    });

    console.log(`  ✅ ${data.name}`);
  }

  console.log('\n8 patients insérés avec succès.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
