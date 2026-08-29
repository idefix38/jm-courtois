import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';
import type { LivreData } from '@/types/strapi';
import LivrePicto, { type LivrePictoName } from '@/components/ui/LivrePicto';
import BoutonCta from '@/components/ui/BoutonCta';
import LaurierSeparator from '../ui/LaurierSeparator';
import RichText from '@/components/ui/RichText';

function InfoItem({ icon, children }: { icon: LivrePictoName; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-anthracite">
      <LivrePicto name={icon} className="w-4 h-4 shrink-0" style={{ color: '#B5883D' }} />
      {children}
    </span>
  );
}

export default function DetailLivre({ livre }: { livre: LivreData }) {
  const coverUrl = getStrapiMedia(livre.Couverture?.url ?? null);
  const editeurUrl = livre.LienEditeur || livre.UrlSiteEditeur || null;
  const dateLabel = livre.DatePublication
    ? new Date(livre.DatePublication).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    : null;

  return (
    <section className="relative py-16 shadow-lg overflow-hidden" style={{ backgroundColor: '#F4EFE8' }}>
      <div
        className="hidden md:block absolute right-0 w-[300px] h-[426px] pointer-events-none"
        style={{ backgroundImage: 'url(/images/barque-mekong.300x426.webp)', backgroundRepeat: 'no-repeat', backgroundPosition: 'top right', backgroundSize: 'auto' }}
      />
      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {livre.Genre && (
          <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-gris-doux mb-3">
            {livre.Genre}
          </p>
        )}
        <div className="w-10 h-0.5 mb-8" style={{ backgroundColor: '#B5883D' }} />

        <div className="relative grid grid-cols-[minmax(0,140px)_1fr] md:grid-cols-12 gap-6 md:gap-10">

          {/* Colonne 1 : couverture */}
          {coverUrl && (
            <div className="md:col-span-3">
              <div className="relative aspect-[2/3]">
                <Image
                  src={coverUrl}
                  alt={livre.Couverture?.alternativeText ?? livre.Titre}
                  fill
                  sizes="(min-width: 768px) 25vw, 140px"
                  className="object-cover rounded"
                />
              </div>
            </div>
          )}

          {/* Colonne 2 : contenu */}
          <div className="md:col-span-6 flex flex-col">
            <h1 className="font-serif text-3xl md:text-4xl text-vert-profond mb-3 leading-tight">
              {livre.Titre}
            </h1>

            {livre.SousTitre && (
              <p className="font-serif italic text-xl text-vert-profond mb-5 leading-snug">
                {livre.SousTitre}
              </p>
            )}

            <div className="flex flex-col gap-2 mb-6">
              {livre.Auteur && <InfoItem icon="auteur">{livre.Auteur}</InfoItem>}
              {livre.Editeur && (
                <InfoItem icon="editeur">
                  {editeurUrl ? (
                    <a
                      href={editeurUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-vert-sauge"
                    >
                      {livre.Editeur}
                    </a>
                  ) : (
                    livre.Editeur
                  )}
                </InfoItem>
              )}
              {dateLabel && <InfoItem icon="date">{dateLabel}</InfoItem>}
              {livre.NombreDePages && <InfoItem icon="pages">{livre.NombreDePages} pages</InfoItem>}
              {livre.Langue && <InfoItem icon="langue">{livre.Langue}</InfoItem>}
              {livre.ISBN && <InfoItem icon="isbn">ISBN {livre.ISBN}</InfoItem>}
            </div>
          </div>

          {/* Boutons d'achat, pleine largeur du bloc et centrés */}
          <div className="col-span-2 md:col-span-12 flex flex-nowrap items-center justify-center gap-3">
            {livre.LienAmazon && (
              <BoutonCta bouton={{ id: -1, Titre: 'Acheter sur Amazon', Url: livre.LienAmazon, Style: 'Primaire' }} />
            )}
            {livre.LienFnac && (
              <BoutonCta bouton={{ id: -2, Titre: 'Acheter sur Fnac', Url: livre.LienFnac, Style: 'Primaire' }} />
            )}
          </div>

          {/* Résumé, pleine largeur du bloc */}
          {livre.Resume && (
            <>
            <div className="col-span-2 md:col-span-12">
              <LaurierSeparator  />
            </div>
            <div className="col-span-2 md:col-span-12 clear-both">
              <span className="float-left font-serif text-6xl leading-[0.7] text-[#B5883D] mr-2" aria-hidden="true">&ldquo;</span>
              <RichText html={livre.Resume} />
            </div>
            </>
          )}

        </div>
      </div>
    </section>
  );
}
