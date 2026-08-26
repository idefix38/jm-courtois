import qs from 'qs';

const STRAPI_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export function getStrapiURL(path = '') {
    return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null) {
    if (!url) return null;
    if (url.startsWith('http')) return url;
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
    const url = getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`);

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;

    const res = await fetch(url, {
        headers,
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`Strapi fetch error: ${res.status} ${url}`);

    const data = await res.json();
    return data;
}

export async function getHome() {
    return fetchAPI('/home', {
        populate: { content: { populate: '*' }, seo: { populate: '*' } },
    });
}

export async function getPage(slug: string) {
    return fetchAPI('/pages', {
        filters: { slug: { $eq: slug } },
        populate: { content: { populate: '*' }, seo: { populate: '*' } },
    });
}

export async function getPages() {
    return fetchAPI('/pages', { fields: ['title', 'slug'] });
}

export async function getBook(slug: string) {
    return fetchAPI('/books', {
        filters: { slug: { $eq: slug } },
        populate: {
            cover: true,
            excerpt_page: { fields: ['slug'] },
            content: { populate: '*' },
            seo: { populate: '*' },
        },
    });
}

export async function getBooks() {
    return fetchAPI('/books', {
        populate: { cover: true },
        sort: ['publication_date:desc'],
    });
}

export async function getEvents() {
    return fetchAPI('/events', {
        populate: { image: true },
        sort: ['date:asc'],
    });
}

export async function getPressReviews() {
    return fetchAPI('/press-reviews', {
        populate: { book: { fields: ['title', 'slug'] } },
        sort: ['published_at_source:desc'],
    });
}

export async function submitContact(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
}) {
    const url = getStrapiURL('/api/contact-submissions');
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;

    const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data }),
    });

    if (!res.ok) throw new Error('Erreur lors de l\'envoi du message');
    return res.json();
}
