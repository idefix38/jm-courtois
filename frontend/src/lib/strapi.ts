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
}

async function fetchAPI<T>(path: string, options: FetchOptions = {}): Promise<T> {
    const queryString = qs.stringify(options, { encodeValuesOnly: true });
    const url = getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`);

    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;

    const res = await fetch(url, {
        headers,
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Strapi fetch error: ${res.status} ${url}`);

    return res.json();
}

export async function getHome() {
    return fetchAPI("/home-page", {
        populate: {
            dynamicZone: { populate: "*" },
            Seo: true,
        },
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
            Contenu: { populate: "*" },
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

export async function getLivre(slug: string) {
    return fetchAPI("/livres", {
        filters: { Slug: { $eq: slug } },
        populate: { Couverture: true, Seo: true },
    });
}

export async function getAvis() {
    return fetchAPI("/avis", {
        sort: ["Date:desc"],
    });
}
