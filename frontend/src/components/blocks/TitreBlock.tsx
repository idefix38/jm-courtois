import type { TitreBlock as TitreBlockType } from '@/types/strapi';

export default function TitreBlock({ block }: { block: TitreBlockType }) {
  return (
    <section className="relative py-8 px-6 bg-beige-clair">
      <div className="max-w-[600px] mx-auto text-center">
        <h1 className="font-serif font-bold uppercase text-3xl md:text-4xl text-[#24333A] tracking-wide">
          {block.Titre}
        </h1>

        {block.SousTitre && (
          <>
            <div className="w-10 h-1 mx-auto mt-5 mb-4" style={{ backgroundColor: '#C8B99A' }} />
            <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-[#6F6F6F]">
              {block.SousTitre}
            </p>
          </>
        )}

        {block.Accroche && (
          <div className="clear-both mt-8 text-left inline-block">
            <span className="float-left font-serif text-6xl leading-[0.7] text-[#C8B99A] mr-2" aria-hidden="true">&ldquo;</span>
            <p className="font-serif italic text-[#24333A] leading-relaxed">
              {block.Accroche}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
