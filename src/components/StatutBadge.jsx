// Gère les deux formes : 'Paye' (DB) et 'Payé' (affichage)
const CONFIG = {
  'Payé':      { label: 'Payé',      cls: 'bg-green-100 text-green-800 border border-green-300' },
  'Paye':      { label: 'Payé',      cls: 'bg-green-100 text-green-800 border border-green-300' },
  'En cours':  { label: 'En cours',  cls: 'bg-orange-100 text-orange-800 border border-orange-300' },
  'En retard': { label: 'En retard', cls: 'bg-red-100 text-red-800 border border-red-300' },
  'Actif':     { label: 'Actif',     cls: 'bg-green-100 text-green-800 border border-green-300' },
  'Prospect':  { label: 'Prospect',  cls: 'bg-blue-100 text-blue-800 border border-blue-300' },
  'Dormant':   { label: 'Dormant',   cls: 'bg-red-100 text-red-800 border border-red-300' },
}

export default function StatutBadge({ statut }) {
  const { label, cls } = CONFIG[statut] || { label: statut, cls: 'bg-gray-100 text-gray-700 border border-gray-300' }
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${cls}`}>
      {label}
    </span>
  )
}
