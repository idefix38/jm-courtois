import type { Block } from '@/types/strapi';
import HeroBlock from './PageBuilder/HeroBlock';
import TexteImageBlock from './PageBuilder/TexteImageBlock';
import CitationBlock from './PageBuilder/CitationBlock';
import TitreBlock from './PageBuilder/TitreBlock';
import TexteBlock from './PageBuilder/TexteBlock';
import ListeLivreBlock from './PageBuilder/ListeLivreBlock';
import ListeAvisBlock from './PageBuilder/ListeAvisBlock';
import ListeActualitesBlock from './PageBuilder/ListeActualitesBlock';
import LivreBlock from './PageBuilder/LivreBlock';
import { BLOCK_SPACING_CLASS } from '@/lib/constants';

export default function DynamicZone({ blocks, skipTopPadding = false }: { blocks: Block[]; skipTopPadding?: boolean }) {
  if (!blocks?.length) return null;

  // Le Hero s'étend sous le header transparent (desktop) ; les autres blocs doivent commencer sous le header
  const startsWithHero = blocks[0]?.__component === 'page-builder.hero';

  return (
    <div className={startsWithHero || skipTopPadding ? undefined : 'md:pt-16'}>
      {blocks.map((block, index) => {
        const spacing = index > 0 ? BLOCK_SPACING_CLASS : '';
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
          case 'page-builder.liste-avis':
            return <div key={`liste-avis-${block.id}`} className={spacing}><ListeAvisBlock /></div>;
          case 'page-builder.liste-actualites':
            return <div key={`liste-actualites-${block.id}`} className={spacing}><ListeActualitesBlock block={block} /></div>;
          case 'page-builder.bloc-livre':
            return <div key={`bloc-livre-${block.id}`} className={spacing}><LivreBlock block={block} /></div>;
          default:
            return null;
        }
      })}
      <div className={BLOCK_SPACING_CLASS} />
    </div>
  );
}
