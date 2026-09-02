import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';
import type { ActualiteData } from '@/types/strapi';
import BoutonCta from '@/components/ui/BoutonCta';

const MOIS_ABREGES = ['JANV.', 'FÉVR.', 'MARS', 'AVR.', 'MAI', 'JUIN', 'JUIL.', 'AOÛT', 'SEPT.', 'OCT.', 'NOV.', 'DÉC.'];

export default function ActualiteCard({ actualite }: { actualite: ActualiteData }) {
  const date = new Date(actualite.Date);
  const imageUrl = getStrapiMedia(actualite.Image?.url ?? null);

  return (
    <div className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6 bg-white rounded-lg shadow p-4 md:p-6">

      {/* Colonne 1 : date, taille fixe */}
      <div
        className="flex flex-col items-center justify-center shrink-0 w-16 h-16 md:w-20 md:h-20 rounded"
        style={{ backgroundColor: '#24333A', color: '#F6F6F2' }}
      >
        <span className="font-serif text-2xl md:text-3xl leading-none">{date.getDate()}</span>
        <span className="font-display text-[10px] md:text-xs uppercase tracking-widest mt-1">{MOIS_ABREGES[date.getMonth()]}</span>
      </div>

      {/* Colonne 2 : titre, lieu, lien */}
      <div className="min-w-0">
        <h3 className="font-serif text-lg md:text-xl text-vert-profond leading-snug">
          {actualite.Titre}
        </h3>
        {actualite.Lieu && (
          <p className="text-sm text-gris-doux mt-1">{actualite.Lieu}</p>
        )}
        <div className="mt-2">
          <BoutonCta bouton={{ id: actualite.id, Titre: 'En savoir plus', Url: `/actualites/${actualite.Url}`, Style: 'Link' }} />
        </div>
      </div>

      {/* Colonne 3 : visuel, hauteur fixe, largeur auto (pas de fill/absolute, le ratio réel de l'image est préservé) */}
      {imageUrl && (
        <div className="col-span-2 md:col-span-1 justify-self-center h-32 md:h-24">
          <Image
            src={imageUrl}
            alt={actualite.Image?.alternativeText ?? actualite.Titre}
            width={actualite.Image?.width ?? 300}
            height={actualite.Image?.height ?? 200}
            sizes="200px"
            style={{ height: '100%', width: 'auto' }}
            className="rounded"
          />
        </div>
      )}
    </div>
  );
}
