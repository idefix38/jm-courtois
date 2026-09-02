import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

// Active le Draft Mode de Next.js et redirige vers le contenu, appelé depuis le bouton "Preview" du CMS
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get('secret');
    const path = searchParams.get('path');

    if (!secret || secret !== process.env.PREVIEW_SECRET) {
        return new Response('Invalid preview secret', { status: 401 });
    }

    // N'autorise que les chemins internes relatifs, pour éviter toute redirection ouverte
    if (!path || !path.startsWith('/') || path.startsWith('//')) {
        return new Response('Invalid path', { status: 400 });
    }

    const draft = await draftMode();
    draft.enable();

    redirect(path);
}
