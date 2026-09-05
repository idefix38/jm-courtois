import type { ContactBlock as ContactBlockType, DynamicZoneSource } from '@/types/strapi';
import { getTurnstileSiteKey } from '@/lib/turnstile';
import ContactForm from './ContactForm';

// Même habillage visuel que ListeActualitesBlock (fond beige clair, titre + séparateur ocre)
export default function ContactBlock({ block, source }: { block: ContactBlockType; source: DynamicZoneSource }) {
  return (
    <section className="relative py-16 px-6 shadow-lg overflow-hidden" style={{ backgroundColor: '#F8F2EC' }}>
      <div
        className="hidden md:block absolute inset-x-0 top-0 bottom-0 pointer-events-none"
        style={{ backgroundImage: 'url(/images/vol-oiseaux2.webp)', backgroundRepeat: 'no-repeat', backgroundPosition: 'top right', backgroundSize: 'auto' }}
      />
      <div className="container mx-auto max-w-2xl relative z-10">
        <h2 className="font-serif text-3xl md:text-4xl text-vert-profond leading-tight">
          {block.Titre}
        </h2>
        <div className="w-10 h-0.5 my-8" style={{ backgroundColor: '#B5883D' }} />

        {block.Description && (
          <p className="text-anthracite whitespace-pre-line mb-8">{block.Description}</p>
        )}

        {/* La clé de site Turnstile n'est pas un secret (elle est de toute façon exposée dans le HTML du widget) */}
        <ContactForm blockId={block.id} source={source} siteKey={getTurnstileSiteKey()} />
      </div>
    </section>
  );
}
