import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';
import type { TexteImageBlock as TexteImageBlockType } from '@/types/strapi';

export default function TexteImageBlock({ block }: { block: TexteImageBlockType }) {
  const imageUrl = getStrapiMedia(block.Image?.url ?? null);
  const imageLeft = block.PositionImage === 'Gauche';

  return (
    <section className="py-16 odd:bg-stone-50 odd:dark:bg-gray-900/50 even:bg-white even:dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col gap-10 ${imageUrl ? 'md:flex-row items-center' : ''} ${imageLeft ? 'md:flex-row-reverse' : ''}`}>

          {/* Texte */}
          <div className={imageUrl ? 'md:w-1/2' : 'max-w-3xl mx-auto'}>
            {/* Trait décoratif amber */}
            <div className="w-10 h-1 bg-amber-500 rounded mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
              {block.Titre}
            </h2>
            {block.Description && (
              <div
                className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: block.Description }}
              />
            )}
            {block.Cta?.Url && (
              <a
                href={block.Cta.Url}
                className={`inline-flex items-center gap-2 mt-6 font-semibold px-6 py-3 rounded-lg transition-all duration-200 ${
                  block.Cta.Style === 'Secondaire'
                    ? 'border-2 border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white'
                    : 'bg-amber-500 hover:bg-amber-400 text-white shadow-md hover:shadow-amber-500/30 hover:shadow-lg'
                }`}
              >
                {block.Cta.Titre}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>

          {/* Image */}
          {imageUrl && (
            <div className="md:w-1/2">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10">
                <Image
                  src={imageUrl}
                  alt={block.Image?.alternativeText ?? block.Titre}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
