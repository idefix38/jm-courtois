import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getActualite, getActualites } from '@/lib/strapi';
import type { ActualiteData } from '@/types/strapi';
import DynamicZone from '@/components/blocks/DynamicZone';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getActualites() as { data: ActualiteData[] };
    return (res.data ?? []).map((actualite) => ({ slug: actualite.Url }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getActualite(slug) as { data: ActualiteData[] };
    const actualite = res.data?.[0];
    if (!actualite) return {};
    return {
      title: `${actualite.Titre} — JM Courtois`,
    };
  } catch {
    return {};
  }
}

export default async function ActualitePage({ params }: Props) {
  const { slug } = await params;

  let actualite: ActualiteData | undefined;
  try {
    const res = await getActualite(slug) as { data: ActualiteData[] };
    actualite = res.data?.[0];
  } catch {
    notFound();
  }

  if (!actualite) notFound();

  return <DynamicZone blocks={actualite.Contenu} />;
}
