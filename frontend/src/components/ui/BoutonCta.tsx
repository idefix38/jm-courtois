import Link from 'next/link';
import type { BoutonCta as BoutonCtaType } from '@/types/strapi';

const styles: Record<BoutonCtaType['Style'], React.CSSProperties> = {
  Primaire:   { background: '#45645B', color: '#fff', padding: '0.875rem 1.75rem' },
  Secondaire: { border: '1px solid #1E1E1E', color: '#1E1E1E', background: 'transparent', padding: '0.875rem 1.75rem' },
  Link:       { color: '#24333A' },
};

export default function BoutonCta({ bouton }: { bouton: BoutonCtaType }) {
  return (
    <Link
      href={bouton.Url}
      className="inline-block font-display font-semibold text-xs uppercase tracking-widest transition-all duration-200"
      style={styles[bouton.Style]}
    >
      {bouton.Style === 'Link'
        ? <>{bouton.Titre} <span aria-hidden="true">→</span></>
        : bouton.Titre}
    </Link>
  );
}
