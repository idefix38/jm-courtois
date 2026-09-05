import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/strapi';
import DynamicZone from '@/components/blocks/DynamicZone';
import type { PageData } from '@/types/strapi';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getPage(slug) as { data: PageData[] };
    const page = res.data?.[0];
    if (!page) return {};
    return {
      title: page.Seo?.metaTitle ?? `${page.Titre} — JM Courtois`,
      description: page.Seo?.metaDescription ?? '',
    };
  } catch {
    return {};
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  let page: PageData | undefined;
  try {
    const res = await getPage(slug) as { data: PageData[] };
    page = res.data?.[0];
  } catch {
    notFound();
  }

  if (!page) notFound();

  return (
    <>            
      {page.Contenu?.length > 0 && <DynamicZone blocks={page.Contenu} source={{ type: 'page', slug }} />}
    </>
  );
}
