'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import type { MenuItemData } from '@/types/strapi';

export default function HeaderClient({ items }: { items: MenuItemData[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="container mx-auto px-6 py-0 h-16 flex items-center justify-between relative">

        {/* Burger — mobile uniquement, à gauche */}
        <button
          className="md:hidden p-2 -ml-2 text-vert-sauge hover:text-vert-profond transition-colors"
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

        {/* Logo */}
        <Link href="/" className="font-script text-5xl text-vert-profond shrink-0 leading-none" style={{ fontFamily: 'var(--font-corinthia), cursive' }}>
          jm
        </Link>

        {/* Navigation desktop — centrée absolument */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-4">
            {items.map((item) => {
              const active = pathname === item.Url;
              return (
                <li key={item.id}>
                  <Link
                    href={item.Url}
                    className={[
                      'py-2 text-xs font-display font-semibold uppercase tracking-widest transition-all duration-200 block border-b-2',
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

        <ThemeToggle />
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
    </>
  );
}
