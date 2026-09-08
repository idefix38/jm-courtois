import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';

// Appelé par un webhook Strapi (Settings > Webhooks) à chaque publication/modification/suppression
// de contenu, pour invalider immédiatement le cache Next.js au lieu d'attendre le revalidate de 60s.
export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret');

    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
        return new Response('Invalid revalidate secret', { status: 401 });
    }

    const body = await request.json().catch(() => null);
    // Strapi envoie { model: "menu", entry: {...}, event: "entry.publish" }
    const model = body?.model as string | undefined;

    if (!model) {
        return new Response('Missing model in payload', { status: 400 });
    }

    revalidateTag(model);

    return Response.json({ revalidated: true, tag: model, now: Date.now() });
}
