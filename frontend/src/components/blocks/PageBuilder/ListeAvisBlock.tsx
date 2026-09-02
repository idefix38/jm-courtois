import { getAvis } from '@/lib/strapi';
import type { AvisData } from '@/types/strapi';
import AvisCard from '../AvisCard';
import LaurierSeparator from '@/components/ui/LaurierSeparator';

// Bloc sans paramètre : affiche tous les avis publiés, triés par date décroissante (déjà trié par getAvis)
export default async function ListeAvisBlock() {
  let avis: AvisData[] = [];
  try {
    const res = await getAvis() as { data: AvisData[] };
    avis = res.data ?? [];
  } catch {
    avis = [];
  }

  if (!avis.length) return null;

  return (
    <section className="relative py-16 px-6 overflow-hidden" style={{ backgroundColor: '#F8F2EC' }}>
      <div
        className="hidden md:block absolute inset-x-0 top-0 bottom-0 pointer-events-none"
        style={{ backgroundImage: 'url(/images/vol-oiseaux2.webp)', backgroundRepeat: 'no-repeat', backgroundPosition: 'top right', backgroundSize: 'auto' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[190px] pointer-events-none"
        style={{ backgroundImage: 'url(/images/herbes-sauvages-1024x300.webp)', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom center', backgroundSize: 'auto' }}
      />
      <div className="container mx-auto max-w-4xl relative z-10">
        <h2 className="font-serif text-3xl md:text-4xl text-vert-profond text-center leading-tight">
          Ils en parlent mieux que nous
        </h2>
        <div className="my-8">
          <LaurierSeparator />
        </div>
        <div className="flex flex-col gap-6 pb-[100px]">
          {avis.map((item) => (
            <AvisCard key={item.id} avis={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
