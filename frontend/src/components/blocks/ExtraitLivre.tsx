import type { LivreData } from '@/types/strapi';
import LaurierSeparator from '@/components/ui/LaurierSeparator';
import RichText from '@/components/ui/RichText';

export default function ExtraitLivre({ livre }: { livre: LivreData }) {
  if (!livre.Extrait) return null;

  return (
    <section className="relative py-16 shadow-lg overflow-hidden" style={{ backgroundColor: '#F4EFE8' }}>
      <div
        className="absolute inset-x-0 top-0 bottom-0 pointer-events-none"
        style={{ backgroundImage: 'url(/images/fond-oiseaux-300x200.webp)', backgroundRepeat: 'no-repeat', backgroundPosition: 'top right', backgroundSize: 'auto' }}
      />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <p className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-gris-doux mb-3">
          Extrait du livre
        </p>
        <div className="w-10 h-0.5 mb-8" style={{ backgroundColor: '#B5883D' }} />
        <div className="mb-8">
          <LaurierSeparator />
        </div>
        <RichText html={livre.Extrait} />
      </div>
    </section>
  );
}
