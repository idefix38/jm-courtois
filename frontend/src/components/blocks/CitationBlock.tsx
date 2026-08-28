import type { CitationBlock as CitationBlockType } from '@/types/strapi';

export default function CitationBlock({ block }: { block: CitationBlockType }) {
  return (
    <section
      className="relative py-16 px-6 shadow-lg"
      style={{
        backgroundImage: 'url(/images/texture-nuage.webp)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
      }}
    >
      <div className="max-w-[450px] mx-auto">
        {block.Titre && (
          <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-[#6F6F6F] mb-3 text-center">
            {block.Titre}
          </p>
        )}

        <div className="clear-both">
          <span className="float-left font-serif text-6xl leading-[0.7] text-[#24333A] mr-2" aria-hidden="true">&ldquo;</span>

          <div
            className="prose prose-sm max-w-none font-serif italic text-[#24333A] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: block.Description }}
          />
        </div>

        <p className="clear-both font-script text-vert-profond leading-none text-center mt-6" style={{ fontFamily: 'var(--font-corinthia), cursive', fontSize: '60px' }}>
          jm
        </p>
      </div>
    </section>
  );
}
