import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';
import type { HeroBlock as HeroBlockType } from '@/types/strapi';
import BoutonCta from '@/components/ui/BoutonCta';

export default function HeroBlock({ block }: { block: HeroBlockType }) {
  const imageUrl = getStrapiMedia(block.image?.url ?? null);
  const tagline = block.SousTitre ?? block.Accroche;
  const fp = block.image?.focalPoint;
  // object-position positionne le crop vertical selon le point focal
  const objectPosition = fp ? `${fp.x}% ${fp.y}%` : 'center 35%';

  return (
    <section className="relative h-[500px] w-full overflow-hidden md:-mt-16 md:h-[calc(500px+4rem)]">

      {/* fill + object-cover : scale par la largeur pour les images paysage, crop vertical uniquement */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={block.image?.alternativeText ?? block.Titre}
          fill
          className="object-cover"
          style={{ objectPosition }}
          priority
        />
      )}

      {/* Gradient + texte en overlay absolu */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent flex items-center">
        <div className="container mx-auto px-8 md:px-16 py-24">
          <div className="max-w-2xl">

          <h1 className="font-serif italic text-3xl md:text-4xl lg:text-4xl leading-tight text-[#1E1E1E] mb-6">
            {block.Titre}
            {block.Titre_Ligne_2 && (
              <>
                <br />
                {block.Titre_Ligne_2}
              </>
            )}
          </h1>

          {/* Séparateur beige */}
          <div className="w-10 h-0.5 mb-6" style={{ backgroundColor: '#C8B99A' }} />

          {tagline && (
            <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-[#1E1E1E]/70 mb-10">
              {tagline}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {block.Bouton1 && <BoutonCta bouton={block.Bouton1} />}
            {block.Bouton2 && <BoutonCta bouton={block.Bouton2} />}
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}