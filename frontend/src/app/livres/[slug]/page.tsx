import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBook, getBooks } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';
import DynamicZone from '@/components/blocks/DynamicZone';
import type { BookAttributes } from '@/types/strapi';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getBooks() as { data: Array<{ attributes: { slug: string } }> };
    return res.data.map((book) => ({ slug: book.attributes.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getBook(slug) as { data: Array<{ attributes: BookAttributes }> };
    const book = res.data?.[0]?.attributes;
    if (!book) return {};
    return {
      title: book.seo?.meta_title ?? `${book.title} — JM Courtois`,
      description: book.seo?.meta_description ?? book.tagline ?? '',
    };
  } catch {
    return {};
  }
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;

  let book: BookAttributes | undefined;
  try {
    const res = await getBook(slug) as { data: Array<{ attributes: BookAttributes }> };
    book = res.data?.[0]?.attributes;
  } catch {
    notFound();
  }

  if (!book) notFound();

  const coverUrl = getStrapiMedia(book.cover?.data?.attributes?.url ?? null);
  const excerptSlug = book.excerpt_page?.data?.slug;

  return (
    <>
      {/* En-tête livre */}
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row gap-12 items-center">
          {coverUrl && (
            <div className="relative w-48 md:w-64 flex-shrink-0 aspect-[2/3] shadow-2xl">
              <Image src={coverUrl} alt={book.title} fill className="object-cover rounded" />
            </div>
          )}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{book.title}</h1>
            {book.tagline && (
              <p className="text-xl italic text-gray-300 mb-6">{book.tagline}</p>
            )}
            <div className="flex flex-wrap gap-4">
              {book.amazon_url && (
                <a
                  href={book.amazon_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded transition"
                >
                  Acheter ce Livre
                </a>
              )}
              {excerptSlug && (
                <Link
                  href={`/${excerptSlug}`}
                  className="border border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3 rounded transition"
                >
                  Lire un extrait
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Zone dynamique du livre */}
      {book.content?.length > 0 && <DynamicZone blocks={book.content} />}
    </>
  );
}
