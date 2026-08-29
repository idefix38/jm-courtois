import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLivre, getLivres } from '@/lib/strapi';
import type { LivreData } from '@/types/strapi';
import DetailLivre from '@/components/blocks/DetailLivre';
import ExtraitLivre from '@/components/blocks/ExtraitLivre';
import { BLOCK_SPACING_CLASS } from '@/lib/constants';

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

  return (
    <div className="pt-8 md:pt-24 bg-white">
      <DetailLivre livre={livre} />
      <div className={BLOCK_SPACING_CLASS}>
        <ExtraitLivre livre={livre} />
      </div>
    </div>
  );
}
