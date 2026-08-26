import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/strapi';
import type { HeroBlock as HeroBlockType } from '@/types/strapi';

export default function HeroBlock({ block }: { block: HeroBlockType }) {
  const imageUrl = getStrapiMedia(block.visual_header?.data?.attributes?.url ?? null);
  const excerptSlug = block.excerpt_button_page?.data?.slug;

  return (
    <section className="relative min-h-[80vh] flex items-center">
      {imageUrl && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={imageUrl}
            alt={block.visual_header?.data?.attributes?.alternativeText ?? block.tagline}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="container mx-auto px-6 py-24 text-white">
        <p className="text-xl md:text-3xl font-serif italic mb-8 max-w-2xl leading-relaxed">
          {block.tagline}
        </p>
        {block.description && (
          <p className="text-base md:text-lg mb-10 max-w-xl text-white/80">
            {block.description}
          </p>
        )}

        <div className="flex flex-wrap gap-4">
          {block.buy_button_url && (
            <a
              href={block.buy_button_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded transition"
            >
              {block.buy_button_label || 'Acheter ce Livre'}
            </a>
          )}
          {block.excerpt_button_url && (
            <a
              href={block.excerpt_button_url}
              className="inline-block border border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3 rounded transition"
            >
              {block.excerpt_button_label || 'Lire un extrait'}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
