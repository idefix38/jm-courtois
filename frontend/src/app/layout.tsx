import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display, Montserrat, Source_Sans_3, Corinthia } from 'next/font/google';
import './globals.css';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsentInit from '@/components/layout/CookieConsentInit';
import { ThemeProvider } from '@/providers/ThemeProvider';

const GTM_CONTAINER_ID = process.env.GTM_CONTAINER_ID;

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
        {GTM_CONTAINER_ID && (
          <Script id="gtag-consent-default" strategy="beforeInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});`}
          </Script>
        )}
        {GTM_CONTAINER_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
          </Script>
        )}
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        {GTM_CONTAINER_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <ThemeProvider>
          <div className="w-full max-w-[1024px] mx-auto flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <CookieConsentInit />
      </body>
    </html>
  );
}
