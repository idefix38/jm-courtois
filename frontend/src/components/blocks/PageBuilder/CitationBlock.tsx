import type { CitationBlock as CitationBlockType } from '@/types/strapi';
import BoutonCta from '@/components/ui/BoutonCta';

// Uni : pas de fond
const fondImage: Record<string, string | null> = {
  Nuages: '/images/texture-nuage.webp',
  'Cerf-volant': '/images/cerf-volant-1024x500.webp',
  Herbes: '/images/herbes-sauvages-1024x300.webp',
  Uni: null,
};

export default function CitationBlock({ block }: { block: CitationBlockType }) {
  const style = block.Style ?? 'Nuages';
  const isNuages = style === 'Nuages';
  const imageUrl = fondImage[style];

  return (
    <section
      className="relative py-16 px-6 shadow-lg"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: isNuages ? 'center' : 'center bottom',
        backgroundSize: isNuages ? '100% 100%' : '100% auto',
        backgroundColor: isNuages ? undefined : '#F8F2EC',
      }}
    >
      <div className="max-w-[450px] mx-auto">
        {block.Titre && (
          <>
            <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-[#6F6F6F] mb-3 text-center">
              {block.Titre}
            </p>
            <div className="w-10 h-0.5 mx-auto mb-4" style={{ backgroundColor: '#B5883D' }} />
          </>
        )}

        <div className="clear-both">
          <span className="float-left font-serif text-6xl leading-[0.7] mr-2" style={{ color: '#6F6F6F' }} aria-hidden="true">&ldquo;</span>

          <div
            className="prose prose-sm max-w-none font-serif italic text-[#24333A] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: block.Description }}
          />
        </div>

        <p className="clear-both font-script text-vert-profond leading-none text-center mt-6" style={{ fontFamily: 'var(--font-corinthia), cursive', fontSize: '60px' }}>
          jm
        </p>

        {block.Bouton?.Url && (
          <div className="text-center mt-6">
            <BoutonCta bouton={block.Bouton} />
          </div>
        )}
      </div>
    </section>
  );
}
