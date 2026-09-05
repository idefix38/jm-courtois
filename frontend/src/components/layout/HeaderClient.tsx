'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MenuItemData } from '@/types/strapi';

export default function HeaderClient({ items }: { items: MenuItemData[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-50 bg-blanc-casse border-b border-beige-clair shadow-sm transition-colors duration-300',
        'md:fixed md:inset-x-0 md:w-full md:top-0',
        scrolled ? 'md:bg-blanc-casse md:border-b md:border-beige-clair md:shadow-sm' : 'md:bg-transparent md:border-none md:shadow-none',
      ].join(' ')}
    >
      <div className="w-full max-w-[1024px] mx-auto px-6 py-0 h-16 flex items-center justify-between relative">

        {/* Logo */}
        <Link href="/" className="font-script text-5xl text-vert-profond shrink-0 leading-none ml-4" style={{ fontFamily: 'var(--font-corinthia), cursive' }}>
          jm
        </Link>

        {/* Burger — mobile uniquement, à droite */}
        <button
          className="md:hidden p-2 -mr-2 text-vert-sauge hover:text-vert-profond transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Navigation desktop — centrée absolument (inset-x-0 + justify-center : évite que le calcul de largeur "shrink-to-fit" d'un `left-1/2` ne coupe l'espace disponible en deux et force le texte à passer à la ligne) */}
        <nav className="hidden md:flex absolute inset-x-0 justify-center pointer-events-none">
          <ul className="flex items-center gap-8 pointer-events-auto">
            {items.map((item) => {
              const active = pathname === item.Url;
              return (
                <li key={item.id}>
                  <Link
                    href={item.Url}
                    className={[
                      'py-2 text-xs font-display font-semibold uppercase tracking-widest transition-all duration-200 block border-b-2 whitespace-nowrap',
                      active
                        ? 'text-anthracite border-vert-gris'
                        : 'text-anthracite border-transparent hover:border-beige',
                    ].join(' ')}
                  >
                    {item.Titre}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

      </div>

      {/* Menu mobile déroulant */}
      {open && (
        <div className="md:hidden border-t border-beige-clair bg-blanc-casse">
          <ul className="flex flex-col px-4 py-3">
            {items.map((item) => {
              const active = pathname === item.Url;
              return (
                <li key={item.id}>
                  <Link
                    href={item.Url}
                    onClick={() => setOpen(false)}
                    className={[
                      'flex items-center gap-3 px-3 py-3 text-xs font-display font-semibold uppercase tracking-widest transition-colors',
                      active
                        ? 'text-vert-profond'
                        : 'text-gris-doux hover:text-vert-profond',
                    ].join(' ')}
                  >
                    {active && <span className="w-1 h-4 bg-beige rounded-full shrink-0" />}
                    {item.Titre}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
