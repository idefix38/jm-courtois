import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import { getLivre, getLivres, getStrapiMedia } from '@/lib/strapi';
import type { LivreData } from '@/types/strapi';
import DetailLivre from '@/components/blocks/DetailLivre';
import ExtraitLivre from '@/components/blocks/ExtraitLivre';
import { BLOCK_SPACING_CLASS } from '@/lib/constants';

// Retire les balises HTML pour obtenir une description texte brut (JSON-LD, meta description)
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function buildBookJsonLd(livre: LivreData) {
  const coverUrl = getStrapiMedia(livre.Couverture?.url ?? null);
  const description = livre.Seo?.metaDescription || (livre.Resume ? stripHtml(livre.Resume) : undefined);

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: livre.Titre,
    alternateName: livre.SousTitre || undefined,
    author: {
      '@type': 'Person',
      name: livre.Auteur,
    },
    isbn: livre.ISBN || undefined,
    numberOfPages: livre.NombreDePages || undefined,
    inLanguage: livre.Langue || undefined,
    genre: livre.Genre || undefined,
    datePublished: livre.DatePublication || undefined,
    publisher: livre.Editeur
      ? { '@type': 'Organization', name: livre.Editeur, url: livre.UrlSiteEditeur || undefined }
      : undefined,
    image: coverUrl || undefined,
    description,
  };

  return jsonLd;
}

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
  const { isEnabled: isPreview } = await draftMode();

  let livre: LivreData | undefined;
  try {
    const res = await getLivre(slug, isPreview) as { data: LivreData[] };
    livre = res.data?.[0];
  } catch {
    notFound();
  }

  if (!livre) notFound();

  return (
    <div className="pt-8 md:pt-24 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBookJsonLd(livre)) }}
      />
      <DetailLivre livre={livre} />
      <div className={BLOCK_SPACING_CLASS}>
        <ExtraitLivre livre={livre} />
      </div>
    </div>
  );
}
