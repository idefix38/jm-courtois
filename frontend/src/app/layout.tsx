import type { Metadata } from 'next';
import { Playfair_Display, Montserrat, Source_Sans_3, Corinthia } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/providers/ThemeProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['400', '600'],
  display: 'swap',
});

const corinthia = Corinthia({
  subsets: ['latin'],
  variable: '--font-corinthia',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JM Courtois — Auteur',
  description: 'Site officiel de JM Courtois, auteur',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${playfair.variable} ${montserrat.variable} ${sourceSans.variable} ${corinthia.variable}`}
    >
      <head>
        {/* Applique le thème avant hydratation pour éviter le flash */}
        <script dangerouslySetInnerHTML={{
          __html: `try{var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}`
        }} />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <ThemeProvider>
          <div className="w-full max-w-[1440px] mx-auto flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
