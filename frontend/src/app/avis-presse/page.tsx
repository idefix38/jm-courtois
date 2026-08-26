import type { Metadata } from 'next';
import { getAvis } from '@/lib/strapi';
import type { AvisData } from '@/types/strapi';

export const metadata: Metadata = {
  title: 'Avis & Presse — JM Courtois',
  description: 'Critiques de presse et avis de lecteurs',
};

export default async function AvisPage() {
  let avis: AvisData[] = [];

  try {
    const res = await getAvis() as { data: AvisData[] };
    avis = res.data ?? [];
  } catch {
    // CMS indisponible
  }

  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <h1 className="text-4xl font-serif font-bold mb-12 text-center dark:text-white">Avis</h1>

      {avis.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {avis.map((a) => (
            <div key={a.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="text-amber-500 mb-2">
                {'★'.repeat(a.Note)}{'☆'.repeat(5 - a.Note)}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{a.Titre}</h3>
              <p className="italic text-gray-700 dark:text-gray-300 mb-3">&ldquo;{a.Texte}&rdquo;</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                — {a.Prenom} · {new Date(a.Date).toLocaleDateString('fr-FR')}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-12">Aucun avis disponible pour le moment.</p>
      )}
    </div>
  );
}
