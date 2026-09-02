import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';
import type { LivreData } from '@/types/strapi';
import LivrePicto, { type LivrePictoName } from '@/components/ui/LivrePicto';
import BoutonCta from '@/components/ui/BoutonCta';

function InfoItem({ icon, children }: { icon: LivrePictoName; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-anthracite">
      <LivrePicto name={icon} className="w-4 h-4 shrink-0" style={{ color: '#B5883D' }} />
      {children}
    </span>
  );
}

// Retire les balises HTML du résumé (CKEditor) et coupe proprement autour de maxLength caractères
function truncateResume(html: string, maxLength: number): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

export default function Livre({ livre }: { livre: LivreData }) {
  const coverUrl = getStrapiMedia(livre.Couverture?.url ?? null);
  const editeurUrl = livre.LienEditeur || livre.UrlSiteEditeur || null;
  const dateLabel = livre.DatePublication
    ? new Date(livre.DatePublication).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    : null;

  return (
    <section className="relative py-16 shadow-lg overflow-hidden" style={{ backgroundColor: '#F5EDE4' }}>
      <div
        className="absolute inset-x-0 top-0 bottom-0 pointer-events-none"
        style={{ backgroundImage: 'url(/images/fond-oiseaux-300x200.webp)', backgroundRepeat: 'no-repeat', backgroundPosition: 'top right', backgroundSize: 'auto' }}
      />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">

          {coverUrl && (
            <Link href={`/livres/${livre.Slug}`} className="shrink-0 w-32 md:w-1/5">
              <div className="relative aspect-[2/3]">
                <Image
                  src={coverUrl}
                  alt={livre.Couverture?.alternativeText ?? livre.Titre}
                  fill
                  sizes="(min-width: 768px) 20vw, 8rem"
                  className="object-cover rounded"
                />
              </div>
            </Link>
          )}

          <div className="flex-1 min-w-0 md:w-4/5">
            {livre.Genre && (
              <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-gris-doux mb-3">
                {livre.Genre}
              </p>
            )}

            <div className="w-12 h-1 mt-1 mb-4" style={{ backgroundColor: '#B5883D' }} />

            <h2 className="font-serif text-3xl md:text-4xl text-vert-profond mb-3 leading-tight">
              <Link href={`/livres/${livre.Slug}`} className="hover:underline">{livre.Titre}</Link>
            </h2>

            {livre.SousTitre && (
              <p className="font-serif italic text-xl text-vert-profond mb-5 leading-snug">
                {livre.SousTitre}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
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
            </div>

            {livre.Resume && (
              <p className="text-sm text-anthracite leading-relaxed">
                {truncateResume(livre.Resume, 300)}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <Link
                href={`/livres/${livre.Slug}`}
                className="inline-block font-display font-semibold text-xs uppercase tracking-widest text-white bg-vert-sauge px-7 py-3.5 hover:bg-vert-profond transition-colors duration-200"
              >
                En savoir plus
              </Link>
              {livre.LienAmazon && (
                <BoutonCta bouton={{ id: -1, Titre: 'Acheter sur Amazon', Url: livre.LienAmazon, Style: 'Secondaire' }} />
              )}
              {livre.LienFnac && (
                <BoutonCta bouton={{ id: -2, Titre: 'Acheter sur Fnac', Url: livre.LienFnac, Style: 'Secondaire' }} />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
