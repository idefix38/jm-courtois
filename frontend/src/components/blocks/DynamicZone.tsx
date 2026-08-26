import type { Block } from '@/types/strapi';
import HeroBlock from './HeroBlock';
import TexteImageBlock from './TexteImageBlock';

export default function DynamicZone({ blocks }: { blocks: Block[] }) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((block) => {
        switch (block.__component) {
          case 'page-builder.hero':
            return <HeroBlock key={block.id} block={block} />;
          case 'page-builder.texte-image':
            return <TexteImageBlock key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
