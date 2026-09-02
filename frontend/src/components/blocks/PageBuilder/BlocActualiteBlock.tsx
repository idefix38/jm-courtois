import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';
import type { BlocActualiteBlock as BlocActualiteBlockType } from '@/types/strapi';
import DateSquare from '@/components/ui/DateSquare';
import EvenementPicto from '@/components/ui/EvenementPicto';
import RichText from '@/components/ui/RichText';

export default function BlocActualiteBlock({ block }: { block: BlocActualiteBlockType }) {
  const actualite = block.Actualite;
  if (!actualite) return null;

  const date = new Date(actualite.Date);
  const dateLabel = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const imageUrl = getStrapiMedia(actualite.Image?.url ?? null);

  return (
    <section className="py-16 px-6 shadow-lg" style={{ backgroundColor: '#F8F2EC' }}>
      <div className="container mx-auto max-w-4xl">

        {/* Ligne 1 : date + titre */}
        <div className="flex items-center gap-4 md:gap-6">
          <DateSquare date={date} />
          <h1 className="flex-1 text-center font-serif text-2xl md:text-4xl text-vert-profond leading-tight">
            {actualite.Titre}
          </h1>
        </div>

        {/* Ligne 2 : lieu, date complète, heure */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-2 mt-6 text-sm text-anthracite">
          {actualite.Lieu && (
            <span className="inline-flex items-center gap-1.5">
              <EvenementPicto name="lieu" className="w-4 h-4 shrink-0" style={{ color: '#B5883D' }} />
              {actualite.Lieu}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <EvenementPicto name="date" className="w-4 h-4 shrink-0" style={{ color: '#B5883D' }} />
            {dateLabel}
          </span>
          {actualite.Heure && (
            <span className="inline-flex items-center gap-1.5">
              <EvenementPicto name="heure" className="w-4 h-4 shrink-0" style={{ color: '#B5883D' }} />
              {actualite.Heure}
            </span>
          )}
        </div>

        {/* Ligne 3 : visuel (max 1/3 en desktop) + description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 items-start">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={actualite.Image?.alternativeText ?? actualite.Titre}
              width={actualite.Image?.width ?? 600}
              height={actualite.Image?.height ?? 400}
              sizes="(min-width: 768px) 33vw, 100vw"
              style={{ width: '100%', height: 'auto' }}
              className="rounded"
            />
          )}
          {actualite.Description && <div className="md:col-span-2"><RichText html={actualite.Description} /></div>}
        </div>
      </div>
    </section>
  );
}
