'use client';

import Link from 'next/link';
import type { BoutonCta as BoutonCtaType } from '@/types/strapi';
import { pushToDataLayer } from '@/lib/gtm';

const styles: Record<BoutonCtaType['Style'], React.CSSProperties> = {
  Primaire:   { background: '#45645B', color: '#fff', padding: '0.875rem 1.75rem' },
  Secondaire: { border: '1px solid #1E1E1E', color: '#1E1E1E', background: 'transparent', padding: '0.875rem 1.75rem' },
  Link:       { color: '#24333A' },
};

export default function BoutonCta({ bouton, gtmEvent }: { bouton: BoutonCtaType; gtmEvent?: string }) {
  if (!bouton.Url) return null;
  return (
    <Link
      href={bouton.Url}
      onClick={gtmEvent ? () => pushToDataLayer(gtmEvent) : undefined}
      className="inline-block text-center font-display font-semibold text-xs uppercase tracking-widest transition-all duration-200"
      style={styles[bouton.Style]}
    >
      {bouton.Style === 'Link'
        ? <>{bouton.Titre} <span aria-hidden="true">→</span></>
        : bouton.Titre}
    </Link>
  );
}
