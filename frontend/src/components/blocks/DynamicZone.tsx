import type { Block } from '@/types/strapi';
import HeroBlock from './HeroBlock';
import TexteImageBlock from './TexteImageBlock';
import CitationBlock from './CitationBlock';
import TitreBlock from './TitreBlock';
import TexteBlock from './TexteBlock';
import ListeLivreBlock from './ListeLivreBlock';

export default function DynamicZone({ blocks }: { blocks: Block[] }) {
  if (!blocks?.length) return null;

  // Le Hero s'étend sous le header transparent (desktop) ; les autres blocs doivent commencer sous le header
  const startsWithHero = blocks[0]?.__component === 'page-builder.hero';

  return (
    <div className={startsWithHero ? undefined : 'md:pt-16'}>
      {blocks.map((block, index) => {
        const spacing = index > 0 ? 'mt-[15px]' : '';
        switch (block.__component) {
          case 'page-builder.hero':
            return <div key={`hero-${block.id}`} className={spacing}><HeroBlock block={block} /></div>;
          case 'page-builder.texte-image':
            return <div key={`texte-image-${block.id}`} className={spacing}><TexteImageBlock block={block} /></div>;
          case 'page-builder.citation':
            return <div key={`citation-${block.id}`} className={spacing}><CitationBlock block={block} /></div>;
          case 'page-builder.titre':
            return <div key={`titre-${block.id}`} className={spacing}><TitreBlock block={block} /></div>;
          case 'page-builder.texte':
            return <div key={`texte-${block.id}`} className={spacing}><TexteBlock block={block} /></div>;
          case 'page-builder.liste-livre':
            return <div key={`liste-livre-${block.id}`} className={spacing}><ListeLivreBlock /></div>;
          default:
            return null;
        }
      })}
      <div className="mt-[15px]" />
    </div>
  );
}
