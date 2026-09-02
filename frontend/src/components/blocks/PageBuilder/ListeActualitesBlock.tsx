import { getActualites } from '@/lib/strapi';
import type { ActualiteData, ListeActualitesBlock as ListeActualitesBlockType } from '@/types/strapi';
import ActualiteCard from '../ActualiteCard';
import BoutonCta from '@/components/ui/BoutonCta';

export default async function ListeActualitesBlock({ block }: { block: ListeActualitesBlockType }) {
  const limit = block.NombreActualites ?? 3;
  let actualites: ActualiteData[] = [];
  try {
    const res = await getActualites(limit) as { data: ActualiteData[] };
    actualites = res.data ?? [];
  } catch {
    actualites = [];
  }

  if (!actualites.length) return null;

  return (
    <section className="py-16 px-6 shadow-lg" style={{ backgroundColor: '#F8F2EC' }}>
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-serif text-3xl md:text-4xl text-vert-profond leading-tight">
          {block.Titre}
        </h2>
        <div className="w-10 h-0.5 my-8" style={{ backgroundColor: '#B5883D' }} />
        <div className="flex flex-col gap-4">
          {actualites.map((actualite) => (
            <ActualiteCard key={actualite.id} actualite={actualite} />
          ))}
        </div>
        <div className="text-center mt-10">
          {block.Bouton?.Url && <BoutonCta bouton={block.Bouton} />}
        </div>
      </div>
    </section>
  );
}
