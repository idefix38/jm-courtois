import type { Block } from '@/types/strapi';
import HeroBlock from './HeroBlock';
import RichTextBlock from './RichTextBlock';
import ImageWithTextBlock from './ImageWithTextBlock';

export default function DynamicZone({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.__component) {
          case 'blocks.hero':
            return <HeroBlock key={block.id} block={block} />;
          case 'blocks.rich-text':
            return <RichTextBlock key={block.id} block={block} />;
          case 'blocks.image-with-text':
            return <ImageWithTextBlock key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
