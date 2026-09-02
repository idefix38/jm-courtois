import type { TexteBlock as TexteBlockType } from '@/types/strapi';
import LaurierSeparator from '@/components/ui/LaurierSeparator';
import RichText from '@/components/ui/RichText';

// Uni : pas de fond ; Livre / Barque : illustration décorative associée
const fondImage: Record<string, string | null> = {
  Uni: null,
  Livre: '/images/fond-livre-300x480.webp',
  Barque: '/images/fond-livre2-300x480.webp',
};

export default function TexteBlock({ block }: { block: TexteBlockType }) {
  const imageUrl = fondImage[block.Fond ?? 'Uni'];

  return (
    <section className="relative overflow-hidden py-16 px-6 shadow-lg" style={{ backgroundColor: '#F8F2EC' }}>
      {/* Illustration décorative, calée en haut à gauche, sans étirement au-delà de sa taille native */}
      {imageUrl && (
        <div
          className="hidden md:block absolute inset-y-0 left-0 w-2/5 pointer-events-none"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left center',
            backgroundSize: 'auto',
          }}
        />
      )}

      <div className="container mx-auto relative z-10">
        <div className={imageUrl ? 'max-w-xl mx-auto md:ml-[31%] md:mr-6' : 'max-w-xl mx-auto md:max-w-3xl'}>
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
            <div className="my-6">
              <LaurierSeparator />
            </div>
          </div>

          <RichText html={block.Description} />
        </div>
      </div>
    </section>
  );
}
