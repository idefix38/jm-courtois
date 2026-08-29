import type { TitreBlock as TitreBlockType } from '@/types/strapi';
import PlumeIcon from '@/components/ui/PlumeIcon';

export default function TitreBlock({ block }: { block: TitreBlockType }) {
  return (
    <section className="relative py-8 px-6 bg-beige-clair">
      <div className="flex items-center justify-center gap-3">
        <PlumeIcon className="hidden md:inline-block w-10 h-10 text-[#7A8D7D]" />
        <h1 className="whitespace-nowrap px-[30px] font-serif font-bold text-2xl md:text-4xl text-[#24333A] tracking-wide">
          {block.Titre}
        </h1>
        <PlumeIcon className="hidden md:inline-block w-10 h-10 text-[#7A8D7D]" />
      </div>

      <div className="max-w-[600px] mx-auto text-center">
        {block.SousTitre && (
          <>
            <div className="w-10 h-1 mx-auto mt-5 mb-4" style={{ backgroundColor: '#B5883D' }} />
            <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-[#6F6F6F]">
              {block.SousTitre}
            </p>
          </>
        )}

        {block.Accroche && (
          <div className="clear-both mt-8 text-left inline-block">
            <span className="float-left font-serif text-6xl leading-[0.7] text-[#B5883D] mr-2" aria-hidden="true">&ldquo;</span>
            <p className="font-serif italic text-[#24333A] leading-relaxed">
              {block.Accroche}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
