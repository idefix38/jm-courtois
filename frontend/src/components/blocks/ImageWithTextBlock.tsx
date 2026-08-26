import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';
import type { ImageWithTextBlock as ImageWithTextBlockType } from '@/types/strapi';

export default function ImageWithTextBlock({ block }: { block: ImageWithTextBlockType }) {
  const imageUrl = getStrapiMedia(block.image?.data?.attributes?.url ?? null);
  const isRight = block.image_position === 'right';

  return (
    <section className="container mx-auto px-6 py-16">
      <div className={`flex flex-col md:flex-row gap-10 items-center ${isRight ? 'md:flex-row-reverse' : ''}`}>
        {imageUrl && (
          <div className="relative w-full md:w-1/2 aspect-[4/3]">
            <Image
              src={imageUrl}
              alt={block.image?.data?.attributes?.alternativeText ?? block.title ?? ''}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div className="w-full md:w-1/2">
          {block.title && (
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">{block.title}</h2>
          )}
          {block.text && (
            <div
              className="prose prose-slate font-serif"
              dangerouslySetInnerHTML={{ __html: block.text }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
