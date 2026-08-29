import { getLivres } from '@/lib/strapi';
import type { LivreData } from '@/types/strapi';
import LivreBlock from './LivreBlock';

// Bloc sans paramètre : affiche automatiquement tous les livres publiés
export default async function ListeLivreBlock() {
  let livres: LivreData[] = [];
  try {
    const res = await getLivres() as { data: LivreData[] };
    livres = res.data ?? [];
  } catch {
    livres = [];
  }

  if (!livres.length) return null;

  return (
    <>
      {livres.map((livre, index) => (
        <div key={livre.id} className={index > 0 ? 'mt-[15px]' : ''}>
          <LivreBlock livre={livre} />
        </div>
      ))}
    </>
  );
}
