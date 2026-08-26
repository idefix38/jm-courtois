import type { Metadata } from 'next';
import { getPressReviews } from '@/lib/strapi';
import type { PressReviewAttributes } from '@/types/strapi';

export const metadata: Metadata = {
  title: 'Avis & Presse — JM Courtois',
  description: 'Critiques de presse et avis de lecteurs',
};

export default async function AvisPressePage() {
  let reviews: Array<{ id: number; attributes: PressReviewAttributes }> = [];

  try {
    const res = await getPressReviews() as { data: typeof reviews };
    reviews = res.data ?? [];
  } catch {
    // Le CMS est indisponible, on affiche la page vide
  }

  const pressReviews = reviews.filter((r) => r.attributes.type === 'press');
  const readerReviews = reviews.filter((r) => r.attributes.type === 'reader');

  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <h1 className="text-4xl font-serif font-bold mb-12 text-center">Avis & Presse</h1>

      {pressReviews.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-semibold mb-8 border-b pb-3">Presse</h2>
          <div className="space-y-8">
            {pressReviews.map(({ id, attributes: r }) => (
              <blockquote key={id} className="border-l-4 border-amber-500 pl-6 italic">
                <p className="text-lg text-gray-700 mb-3">&ldquo;{r.quote}&rdquo;</p>
                <footer className="text-sm text-gray-500 not-italic">
                  <span className="font-semibold text-gray-800">{r.author}</span>
                  {' — '}
                  {r.source_url ? (
                    <a href={r.source_url} target="_blank" rel="noopener noreferrer" className="underline">
                      {r.source}
                    </a>
                  ) : (
                    <span>{r.source}</span>
                  )}
                  {r.published_at_source && (
                    <span className="ml-2">
                      ({new Date(r.published_at_source).toLocaleDateString('fr-FR')})
                    </span>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {readerReviews.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif font-semibold mb-8 border-b pb-3">Avis de lecteurs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {readerReviews.map(({ id, attributes: r }) => (
              <div key={id} className="bg-gray-50 rounded-lg p-6">
                {r.rating && (
                  <div className="text-amber-500 mb-2">
                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </div>
                )}
                <p className="italic text-gray-700 mb-3">&ldquo;{r.quote}&rdquo;</p>
                <p className="text-sm text-gray-500">— {r.author}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {reviews.length === 0 && (
        <p className="text-center text-gray-400 py-12">Aucun avis disponible pour le moment.</p>
      )}
    </div>
  );
}
