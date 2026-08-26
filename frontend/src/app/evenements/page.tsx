import type { Metadata } from 'next';
import { getEvents } from '@/lib/strapi';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';
import type { EventAttributes } from '@/types/strapi';

export const metadata: Metadata = {
  title: 'Événements & Actualités — JM Courtois',
  description: 'Retrouvez tous les événements et actualités de JM Courtois',
};

export default async function EvenementsPage() {
  let events: Array<{ id: number; attributes: EventAttributes }> = [];

  try {
    const res = await getEvents() as { data: typeof events };
    events = res.data ?? [];
  } catch {
    // CMS indisponible
  }

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.attributes.date) >= now);
  const past = events.filter((e) => new Date(e.attributes.date) < now);

  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <h1 className="text-4xl font-serif font-bold mb-12 text-center">Événements & Actualités</h1>

      {upcoming.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-semibold mb-8 border-b pb-3">À venir</h2>
          <div className="space-y-8">
            {upcoming.map(({ id, attributes: e }) => (
              <EventCard key={id} event={e} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif font-semibold mb-8 border-b pb-3 text-gray-500">
            Événements passés
          </h2>
          <div className="space-y-8 opacity-70">
            {past.map(({ id, attributes: e }) => (
              <EventCard key={id} event={e} />
            ))}
          </div>
        </section>
      )}

      {events.length === 0 && (
        <p className="text-center text-gray-400 py-12">Aucun événement disponible pour le moment.</p>
      )}
    </div>
  );
}

function EventCard({ event }: { event: EventAttributes }) {
  const imageUrl = getStrapiMedia(event.image?.data?.attributes?.url ?? null);
  const date = new Date(event.date);

  return (
    <article className="flex gap-6 bg-gray-50 rounded-lg overflow-hidden">
      {imageUrl && (
        <div className="relative w-40 flex-shrink-0">
          <Image src={imageUrl} alt={event.title} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        <time className="text-sm text-amber-600 font-semibold">
          {date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </time>
        {event.location && <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>}
        <h3 className="text-xl font-serif font-bold mt-2 mb-2">{event.title}</h3>
        <div
          className="prose prose-sm text-gray-600"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
        {event.registration_url && (
          <a
            href={event.registration_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm font-semibold text-amber-700 hover:underline"
          >
            S&apos;inscrire →
          </a>
        )}
      </div>
    </article>
  );
}
