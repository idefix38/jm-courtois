// Strapi v5 : pas de wrapper data.attributes — les champs sont directement sur l'objet

export interface StrapiImage {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
    formats?: Record<string, { url: string; width: number; height: number }>;
    // Point focal en pourcentage (0–100), fourni par strapi-plugin-focal-point
    focalPoint?: { x: number; y: number } | null;
}

export interface BoutonCta {
    id: number;
    Titre: string;
    Url: string;
    Style: 'Primaire' | 'Secondaire' | 'Link';
}

// ── Blocs page-builder ───────────────────────────────────────────────────────

export interface HeroBlock {
    __component: 'page-builder.hero';
    id: number;
    Titre: string;
    Titre_Ligne_2?: string | null;
    SousTitre?: string | null;
    Accroche?: string | null;
    image: StrapiImage | null;
    Bouton1?: BoutonCta | null;
    Bouton2?: BoutonCta | null;
}

export interface TexteImageBlock {
    __component: 'page-builder.texte-image';
    id: number;
    PreTitre?: string | null;
    Titre: string;
    SousTitre?: string | null;
    Description?: string;
    Image?: StrapiImage | null;
    PositionImage?: 'Gauche' | 'Droite';
    Bouton1?: BoutonCta | null;
    Bouton2?: BoutonCta | null;
    Fond?: 'Uni' | 'Montagne' | 'Fleurs' | 'Nuage' | null;
}

export type Block = HeroBlock | TexteImageBlock;

// ── Composants partagés ──────────────────────────────────────────────────────

export interface SEO {
    metaTitle: string;
    metaDescription: string;
    canonicalURL?: string;
    metaRobots?: 'Index' | 'NoIndex';
}

// ── Content Types ────────────────────────────────────────────────────────────

export interface HomeData {
    id: number;
    documentId: string;
    dynamicZone: Block[];
    Seo?: SEO | null;
}

export interface PageData {
    id: number;
    documentId: string;
    Titre: string;
    Slug: string;
    Contenu: Block[];
    Seo?: SEO | null;
}

export interface LivreData {
    id: number;
    documentId: string;
    Titre: string;
    Slug: string;
    Auteur: string;
    Editeur?: string;
    DatePublication?: string;
    ISBN?: string;
    Resume?: string;
    Couverture?: StrapiImage | null;
    Genre?: string;
    NombreDePages?: number;
    Langue?: string;
    Seo?: SEO | null;
}

export interface MenuItemData {
    id: number;
    Titre: string;
    Url: string;
}

export interface AvisData {
    id: number;
    documentId: string;
    Titre: string;
    Texte: string;
    Note: number;
    Prenom: string;
    Date: string;
}

