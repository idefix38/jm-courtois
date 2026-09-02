import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getActualite, getActualites, getStrapiMedia } from '@/lib/strapi';
import type { ActualiteData } from '@/types/strapi';
import DynamicZone from '@/components/blocks/DynamicZone';
import BlocActualiteBlock from '@/components/blocks/PageBuilder/BlocActualiteBlock';
import { BLOCK_SPACING_CLASS } from '@/lib/constants';

// Retire les balises HTML pour obtenir une description texte brut (JSON-LD)
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function buildEventJsonLd(actualite: ActualiteData) {
  const imageUrl = getStrapiMedia(actualite.Image?.url ?? null);

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LiteraryEvent',
    name: actualite.Titre,
    startDate: actualite.Date,
    description: stripHtml(actualite.Description),
    location: actualite.Lieu
      ? { '@type': 'Place', name: actualite.Lieu }
      : undefined,
    image: imageUrl || undefined,
    performer: {
      '@type': 'Person',
      name: 'Jean-Michel Courtois',
    },
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
  };

  return jsonLd;
}

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildEventJsonLd(actualite)) }}
      />
      {/* md:pt-16 : dégage le header fixe (transparent uniquement au-dessus d'un Hero) */}
      <div className={`md:pt-16 ${BLOCK_SPACING_CLASS}`}>
        <BlocActualiteBlock block={{ __component: 'page-builder.bloc-actualite', id: actualite.id, Actualite: actualite }} />
      </div>
      <div className={BLOCK_SPACING_CLASS}>
        <DynamicZone blocks={actualite.Contenu} skipTopPadding />
      </div>
    </>
  );
}
