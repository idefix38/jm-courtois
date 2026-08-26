import type { Metadata } from 'next';
import { getHome } from '@/lib/strapi';
import DynamicZone from '@/components/blocks/DynamicZone';
import type { HomeAttributes } from '@/types/strapi';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await getHome() as { data: { attributes: HomeAttributes } };
    const seo = res.data?.attributes?.seo;
    return {
      title: seo?.meta_title ?? 'JM Courtois — Auteur',
      description: seo?.meta_description ?? '',
    };
  } catch {
    return { title: 'JM Courtois — Auteur' };
  }
}

export default async function HomePage() {
  try {
    const res = await getHome() as { data: { attributes: HomeAttributes } };
    const { content } = res.data.attributes;
    return <DynamicZone blocks={content} />;
  } catch {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">Bienvenue</h1>
        <p className="text-gray-500">Le contenu est en cours de chargement depuis le CMS.</p>
      </div>
    );
  }
}
