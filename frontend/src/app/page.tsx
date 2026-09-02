import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getHome } from '@/lib/strapi';
import DynamicZone from '@/components/blocks/DynamicZone';
import type { HomeData } from '@/types/strapi';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getHome() as { data: HomeData };
    const seo = res.data?.Seo;
    return {
      title: seo?.metaTitle ?? 'JM Courtois — Auteur',
      description: seo?.metaDescription ?? '',
    };
  } catch {
    return { title: 'JM Courtois — Auteur' };
  }
}

export default async function HomePage() {
  const { isEnabled: isPreview } = await draftMode();

  try {
    const res = await getHome(isPreview) as { data: HomeData };
    const blocks = res.data?.dynamicZone ?? [];
    return <DynamicZone blocks={blocks} />;
  } catch {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">Bienvenue</h1>
        <p className="text-gray-500 dark:text-gray-400">Le contenu est en cours de chargement depuis le CMS.</p>
      </div>
    );
  }
}
