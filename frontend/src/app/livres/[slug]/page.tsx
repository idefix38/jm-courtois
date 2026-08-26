import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLivre, getLivres, getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';
import type { LivreData } from '@/types/strapi';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getLivres() as { data: LivreData[] };
    return (res.data ?? []).map((livre) => ({ slug: livre.Slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getLivre(slug) as { data: LivreData[] };
    const livre = res.data?.[0];
    if (!livre) return {};
    return {
      title: livre.Seo?.metaTitle ?? `${livre.Titre} — JM Courtois`,
      description: livre.Seo?.metaDescription ?? '',
    };
  } catch {
    return {};
  }
}

export default async function LivrePage({ params }: Props) {
  const { slug } = await params;

  let livre: LivreData | undefined;
  try {
    const res = await getLivre(slug) as { data: LivreData[] };
    livre = res.data?.[0];
  } catch {
    notFound();
  }

  if (!livre) notFound();

  const coverUrl = getStrapiMedia(livre.Couverture?.url ?? null);

  return (
    <>
      <section className="bg-gray-900 dark:bg-black text-white">
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-center">
          {coverUrl && (
            <div className="relative w-48 md:w-64 flex-shrink-0 aspect-[2/3] shadow-2xl">
              <Image
                src={coverUrl}
                alt={livre.Couverture?.alternativeText ?? livre.Titre}
                fill
                className="object-cover rounded"
              />
            </div>
          )}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">{livre.Titre}</h1>
            {livre.Auteur && <p className="text-lg text-gray-300 mb-1">{livre.Auteur}</p>}
            {livre.Editeur && <p className="text-sm text-gray-400 mb-4">{livre.Editeur}</p>}
            {livre.Resume && (
              <div
                className="prose prose-invert prose-sm max-w-xl mb-6"
                dangerouslySetInnerHTML={{ __html: livre.Resume }}
              />
            )}
            <dl className="text-sm text-gray-400 space-y-1">
              {livre.DatePublication && (
                <div><dt className="inline font-medium text-gray-200">Parution : </dt><dd className="inline">{new Date(livre.DatePublication).toLocaleDateString('fr-FR')}</dd></div>
              )}
              {livre.ISBN && (
                <div><dt className="inline font-medium text-gray-200">ISBN : </dt><dd className="inline">{livre.ISBN}</dd></div>
              )}
              {livre.NombreDePages && (
                <div><dt className="inline font-medium text-gray-200">Pages : </dt><dd className="inline">{livre.NombreDePages}</dd></div>
              )}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
