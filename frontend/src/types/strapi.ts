export interface StrapiImage {
    data: {
        id: number;
        attributes: {
            url: string;
            alternativeText: string | null;
            width: number;
            height: number;
            formats?: Record<string, { url: string; width: number; height: number }>;
        };
    } | null;
}

export interface StrapiRelation<T> {
    data: T | null;
}

export interface StrapiCollection<T> {
    data: Array<{ id: number; attributes: T }>;
    meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

// ── Components ──────────────────────────────────────────────────────────────

export interface HeroBlock {
    __component: 'blocks.hero';
    id: number;
    visual_header: StrapiImage;
    tagline: string;
    description?: string;
    buy_button_label: string;
    buy_button_url: string;
    excerpt_button_label: string;
    excerpt_button_url?: string;
    __component: 'blocks.image-with-text';
    id: number;
    image: StrapiImage;
    title?: string;
    text?: string;
    image_position: 'left' | 'right';
}

export type Block = HeroBlock | RichTextBlock | ImageWithTextBlock;

export interface SEO {
    meta_title: string;
    meta_description: string;
    og_image?: StrapiImage;
}

// ── Content Types ────────────────────────────────────────────────────────────

export interface HomeAttributes {
    seo?: SEO;
    content: Block[];
}

export interface PageAttributes {
    title: string;
    slug: string;
    seo?: SEO;
    content: Block[];
}

export interface BookAttributes {
    title: string;
    slug: string;
    cover: StrapiImage;
    tagline?: string;
    description?: string;
    amazon_url?: string;
    excerpt_page?: StrapiRelation<{ slug: string }>;
    publication_date?: string;
    seo?: SEO;
    content: Block[];
}

export interface EventAttributes {
    title: string;
    slug: string;
    date: string;
    location?: string;
    image?: StrapiImage;
    description: string;
    registration_url?: string;
}

export interface PressReviewAttributes {
    author: string;
    source: string;
    quote: string;
    rating?: number;
    type: 'press' | 'reader';
    published_at_source?: string;
    source_url?: string;
    book?: StrapiRelation<{ title: string; slug: string }>;
}
