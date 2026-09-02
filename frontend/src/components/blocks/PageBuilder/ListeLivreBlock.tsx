import { getLivres } from '@/lib/strapi';
import type { LivreData } from '@/types/strapi';
import LivreBlock from '../Livre';
import { BLOCK_SPACING_CLASS } from '@/lib/constants';

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
        <div key={livre.id} className={index > 0 ? BLOCK_SPACING_CLASS : ''}>
          <LivreBlock livre={livre} />
        </div>
      ))}
    </>
  );
}
