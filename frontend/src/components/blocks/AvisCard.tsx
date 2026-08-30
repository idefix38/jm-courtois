import Image from 'next/image';
import type { AvisData } from '@/types/strapi';

const medallion: Record<AvisData['Sexe'], string> = {
  Homme: '/images/homme.webp',
  Femme: '/images/femme.webp',
};

// Étoile Lucide (licence ISC), pleine ou vide (contour) selon la note
function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 2}
      className="w-4 h-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

export default function AvisCard({ avis }: { avis: AvisData }) {
  const dateLabel = new Date(avis.Date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_4fr] gap-6 md:gap-8 bg-white rounded-lg shadow p-6 md:p-8">

      {/* Partie 1 : médaillon + note + prénom + date — 1/5 de la largeur */}
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden">
          <Image src={medallion[avis.Sexe]} alt="" fill className="object-cover" />
        </div>
        <div>
          <div className="flex gap-0.5 mb-2" style={{ color: '#B5883D' }}>
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} filled={i < avis.Note} />)}
          </div>
          <p className="font-display font-semibold text-sm uppercase tracking-wide text-vert-profond">
            {avis.Prenom}
          </p>
          <p className="text-xs text-gris-doux mt-0.5">{dateLabel}</p>
        </div>
      </div>

      {/* Séparateur vertical, desktop uniquement */}
      <div className="hidden md:block w-px" style={{ backgroundColor: '#E9E5DB' }} />

      {/* Partie 2 : titre + texte de l'avis — 4/5 de la largeur */}
      <div>
        <h3 className="font-serif font-semibold text-lg text-vert-profond mb-2">
          {avis.Titre}
        </h3>
        <div className="clear-both">
          <span className="float-left font-serif text-4xl leading-[0.7] mr-2" style={{ color: '#B5883D' }} aria-hidden="true">&ldquo;</span>
          <p className="font-serif italic text-anthracite leading-relaxed">
            {avis.Texte}
          </p>
          <p className="text-right font-serif text-4xl leading-none" style={{ color: '#B5883D' }} aria-hidden="true">&rdquo;</p>
        </div>
      </div>

    </div>
  );
}
