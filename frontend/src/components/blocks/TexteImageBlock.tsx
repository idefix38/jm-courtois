import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';
import type { TexteImageBlock as TexteImageBlockType, BoutonCta as BoutonCtaType } from '@/types/strapi';
import BoutonCta from '@/components/ui/BoutonCta';

// Couleur de base de la section (hors fond image)
const sectionBg: Record<string, string> = {
  Uni:      '#F6F6F2',
  Montagne: '#F0E9E0',
  Fleurs:   '#E8E3D9',
  Nuage:    '#F6F6F2',
};

// Image décorative positionnée sur la zone de contenu (entre les paddings)
const contentBgStyle: Record<string, React.CSSProperties> = {
  Uni:      {},
  Montagne: { backgroundImage: 'url(/images/montagne-bg.webp)', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: 'auto 100%' },
  Fleurs:   { backgroundImage: 'url(/images/fleurs-bg.webp)',   backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: 'auto 100%' },
  Nuage:    { backgroundImage: 'url(/images/texture-nuage.webp)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '100% 100%' },
};

function ButtonGroup({ b1, b2 }: { b1?: BoutonCtaType | null; b2?: BoutonCtaType | null }) {
  const buttons = [b1, b2].filter((b): b is BoutonCtaType => !!b?.Url);
  if (!buttons.length) return null;
  const hasLink = buttons.some(b => b.Style === 'Link');
  return (
    <div className={`mt-8 flex ${hasLink ? 'flex-col items-start gap-3' : 'flex-row flex-wrap gap-4'}`}>
      {buttons.map((b, i) => <BoutonCta key={b.id ?? i} bouton={b} />)}
    </div>
  );
}

export default function TexteImageBlock({ block }: { block: TexteImageBlockType }) {
  const imageUrl = getStrapiMedia(block.Image?.url ?? null);
  const imageLeft = block.PositionImage !== 'Droite';
  const fond = block.Fond ?? 'Uni';

  return (
    <section
      className="relative py-16"
      style={{
        backgroundColor: sectionBg[fond],
        ...(fond === 'Nuage' ? contentBgStyle.Nuage : {}),
      }}
    >
      {/* Fond image : calé à gauche et miroir quand l'image est à droite */}
      {(fond === 'Montagne' || fond === 'Fleurs') && (
        <div
          className="absolute inset-x-0 top-16 bottom-16 pointer-events-none"
          style={{
            ...contentBgStyle[fond],
            transform: imageLeft ? undefined : 'scaleX(-1)',
          }}
        />
      )}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className={`flex flex-col md:flex-row items-start gap-10 md:gap-16 ${imageLeft ? '' : 'md:flex-row-reverse'}`}>

          {/* Image format 4/5, largeur max 170px */}
          {imageUrl && (
            <div className="shrink-0 mx-auto md:mx-0" style={{ width: '200px', maxWidth: '200px' }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <Image
                  src={imageUrl}
                  alt={block.Image?.alternativeText ?? block.Titre}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Texte */}
          <div className="flex-1 min-w-0">
            {block.PreTitre && (
              <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-[#6F6F6F] mb-3">
                {block.PreTitre}
              </p>
            )}

            <div className="w-10 h-0.5 mb-4" style={{ backgroundColor: '#C8B99A' }} />

            <h2 className="font-serif text-3xl md:text-4xl text-[#24333A] mb-3 leading-tight">
              {block.Titre}
            </h2>

            {block.SousTitre && (
              <p className="font-serif text-xl text-[#45645B] mb-5 leading-snug">
                {block.SousTitre}
              </p>
            )}

            {block.Description && (
              <div
                className="prose prose-sm max-w-none text-[#6F6F6F] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.Description }}
              />
            )}

            <ButtonGroup b1={block.Bouton1} b2={block.Bouton2} />
          </div>

        </div>
      </div>
    </section>
  );
}
