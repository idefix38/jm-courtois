import type { BlocLivreBlock } from '@/types/strapi';
import Livre from '../Livre';

export default function LivreBlock({ block }: { block: BlocLivreBlock }) {
  if (!block.Livre) return null;
  return <Livre livre={block.Livre} />;
}
