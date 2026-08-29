import type { Metadata } from 'next';
import { getLivres } from '@/lib/strapi';
import LivreBlock from '@/components/blocks/LivreBlock';
import type { LivreData } from '@/types/strapi';

export const metadata: Metadata = {
  title: 'Livres — JM Courtois',
};

export default async function LivresPage() {
  let livres: LivreData[] = [];
  try {
    const res = await getLivres() as { data: LivreData[] };
    livres = res.data ?? [];
  } catch {
    livres = [];
  }

  if (!livres.length) {
    return (
      <div className="container mx-auto px-6 py-24 md:pt-32 text-center">
        <p className="text-gris-doux">Aucun livre disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="md:pt-16">
      {livres.map((livre, index) => (
        <div key={livre.id} className={index > 0 ? 'mt-[15px]' : ''}>
          <LivreBlock livre={livre} />
        </div>
      ))}
    </div>
  );
}
