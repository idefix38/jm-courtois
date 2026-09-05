import qs from "qs";

const STRAPI_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export function getStrapiURL(path = "") {
    return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null | undefined): string | null {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return getStrapiURL(url);
}

interface FetchOptions {
    populate?: string | object;
    filters?: object;
    sort?: string | string[];
    pagination?: { page?: number; pageSize?: number };
    fields?: string[];
    status?: 'draft' | 'published';
}

async function fetchAPI<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const queryString = qs.stringify(options, { encodeValuesOnly: true });
    const url = getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`);

    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

    const res = await fetch(url, {
        headers,
        // En mode preview (brouillon), on veut toujours le contenu le plus récent, jamais de cache
        ...(options.status === 'draft' ? { cache: 'no-store' } : { next: { revalidate: 60 } }),
    });

    if (!res.ok) throw new Error(`Strapi fetch error: ${res.status} ${url}`);

    return res.json();
}

// Populate d'une zone dynamique : populate générique pour tous les composants,
// sauf "bloc-livre" dont la relation Livre doit être populée en profondeur (couverture incluse)
const DYNAMIC_ZONE_POPULATE = {
    on: {
        "page-builder.hero": { populate: "*" },
        "page-builder.texte-image": { populate: "*" },
        "page-builder.citation": { populate: "*" },
        "page-builder.titre": { populate: "*" },
        "page-builder.texte": { populate: "*" },
        "page-builder.liste-livre": { populate: "*" },
        "page-builder.liste-avis": { populate: "*" },
        "page-builder.liste-actualites": { populate: "*" },
        "page-builder.bloc-livre": { populate: { Livre: { populate: { Couverture: true } } } },
        "page-builder.contact": { populate: "*" },
    },
};

export async function getHome(preview = false) {
    return fetchAPI("/home-page", {
        populate: {
            dynamicZone: DYNAMIC_ZONE_POPULATE,
            Seo: true,
        },
        ...(preview ? { status: 'draft' } : {}),
    });
}

export async function getMenus() {
    return fetchAPI<{ data: { Items: Array<{ id: number; Titre: string; Url: string }> } }>(
        '/menu',
        { populate: { Items: true } }
    );
}

export async function getPage(slug: string) {
    return fetchAPI("/pages", {
        filters: { Url: { $eq: slug } },
        populate: {
            Contenu: DYNAMIC_ZONE_POPULATE,
            Seo: true,
        },
    });
}

export async function getLivres() {
    return fetchAPI("/livres", {
        populate: { Couverture: true },
        sort: ["DatePublication:desc"],
    });
}

export async function getLivre(slug: string, preview = false) {
    return fetchAPI("/livres", {
        filters: { Slug: { $eq: slug } },
        populate: { Couverture: true, Seo: true },
        ...(preview ? { status: 'draft' } : {}),
    });
}

export async function getAvis() {
    return fetchAPI("/avis", {
        sort: ["Date:desc"],
    });
}

export async function getActualites(limit?: number) {
    return fetchAPI("/actualites", {
        populate: { Image: true },
        sort: ["Date:desc"],
        ...(limit ? { pagination: { pageSize: limit } } : {}),
    });
}

export async function getActualite(slug: string) {
    return fetchAPI("/actualites", {
        filters: { Url: { $eq: slug } },
        populate: { Contenu: DYNAMIC_ZONE_POPULATE, Image: true },
    });
}
