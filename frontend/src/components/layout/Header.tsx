import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/evenements', label: 'Événements' },
  { href: '/avis-presse', label: 'Avis & Presse' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-serif font-bold text-gray-900">
          JM Courtois
        </Link>
        <ul className="flex gap-6 text-sm font-medium text-gray-600">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-gray-900 transition">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
