import type { TexteBlock as TexteBlockType } from '@/types/strapi';
import LaurierSeparator from '@/components/ui/LaurierSeparator';

export default function TexteBlock({ block }: { block: TexteBlockType }) {
  return (
    <section className="relative overflow-hidden py-16 px-6 shadow-lg" style={{ backgroundColor: '#F6F2EE' }}>
      {/* Illustration décorative, calée en haut à gauche, sans étirement au-delà de sa taille native (320px) */}
      <div
        className="hidden md:block absolute inset-y-0 left-0 w-2/5 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/fond-livres-320x500.webp)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center',
          backgroundSize: 'auto',
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-xl mx-auto md:ml-[27%] md:mr-6">
          <div className="text-center">
            {block.PreTitre && (
              <>
                <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-[#6F6F6F]">
                  {block.PreTitre}
                </p>
                <div className="w-10 h-1 mx-auto mt-4 mb-4" style={{ backgroundColor: '#C8B99A' }} />
              </>
            )}

            <h2 className="font-serif text-3xl md:text-4xl text-[#24333A] leading-tight">
              {block.Titre}
            </h2>
            <LaurierSeparator />
          </div>

          <div
            className="prose prose-sm max-w-none text-[#24333A] leading-relaxed [&_hr]:h-px [&_hr]:w-[70px] [&_hr]:border-0 [&_hr]:bg-[#C8B99A] [&_hr]:mt-[15px] [&_hr]:mb-[15px] [&_hr]:ml-0 [&_hr]:mr-auto"
            dangerouslySetInnerHTML={{ __html: block.Description }}
          />
        </div>
      </div>
    </section>
  );
}
