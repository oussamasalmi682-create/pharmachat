'use client';

interface QuickAction {
  label: string;
  emoji: string;
  message: string;
  color: string;
  hoverColor: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'Disponible',
    emoji: '✓',
    message: 'Ce médicament est disponible en stock. Vous pouvez passer le récupérer à la pharmacie.',
    color: 'bg-green-100 text-green-700 border-green-200',
    hoverColor: 'hover:bg-green-500 hover:text-white',
  },
  {
    label: 'Rupture de stock',
    emoji: '✗',
    message:
      'Je suis désolé(e), ce médicament est actuellement en rupture de stock. Nous vous contacterons dès sa disponibilité.',
    color: 'bg-red-50 text-red-600 border-red-200',
    hoverColor: 'hover:bg-red-500 hover:text-white',
  },
  {
    label: 'Ordonnance requise',
    emoji: '📋',
    message:
      "Ce médicament nécessite une ordonnance médicale valide. Veuillez nous apporter votre ordonnance lors du retrait.",
    color: 'bg-orange-50 text-orange-600 border-orange-200',
    hoverColor: 'hover:bg-orange-500 hover:text-white',
  },
  {
    label: 'Commander',
    emoji: '🛒',
    message:
      'Nous pouvons commander ce médicament pour vous. Il sera disponible sous 2 à 3 jours ouvrables. Souhaitez-vous confirmer la commande?',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    hoverColor: 'hover:bg-blue-500 hover:text-white',
  },
  {
    label: 'Informations',
    emoji: 'ℹ️',
    message:
      "Pour toute question supplémentaire, n'hésitez pas à nous appeler directement ou à passer à la pharmacie. Nous sommes là pour vous aider!",
    color: 'bg-[#e0e7ff] text-[#3730a3] border-[#c7d2fe]',
    hoverColor: 'hover:bg-[#4f46e5] hover:text-white',
  },
];

interface QuickActionsProps {
  onAction: (message: string) => void;
}

export default function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gray-50 border-t border-gray-200 overflow-x-auto">
      <span className="text-[12px] text-gray-500 font-semibold flex-shrink-0 mr-1 uppercase tracking-wide">
        Actions rapides :
      </span>
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.label}
          onClick={() => onAction(action.message)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-colors flex-shrink-0 ${action.color} ${action.hoverColor} shadow-sm`}
          title={action.message}
        >
          <span className="font-bold">{action.emoji}</span>
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}
