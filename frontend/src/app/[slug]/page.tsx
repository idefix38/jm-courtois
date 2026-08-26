import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage } from '@/lib/strapi';
import DynamicZone from '@/components/blocks/DynamicZone';
import type { PageAttributes } from '@/types/strapi';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getPage(slug) as { data: Array<{ attributes: PageAttributes }> };
    const page = res.data?.[0]?.attributes;
    if (!page) return {};
    return {
      title: page.seo?.meta_title ?? `${page.title} — JM Courtois`,
      description: page.seo?.meta_description ?? '',
    };
  } catch {
    return {};
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  let page: PageAttributes | undefined;
  try {
    const res = await getPage(slug) as { data: Array<{ attributes: PageAttributes }> };
    page = res.data?.[0]?.attributes;
  } catch {
    notFound();
  }

  if (!page) notFound();

  return (
    <>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-serif font-bold mb-8">{page.title}</h1>
      </div>
      {page.content?.length > 0 && <DynamicZone blocks={page.content} />}
    </>
  );
}
