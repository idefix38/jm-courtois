import { NextResponse, type NextRequest } from 'next/server';
import { Resend } from 'resend';
import { getActualite, getHome, getPage } from '@/lib/strapi';
import { getTurnstileSecretKey } from '@/lib/turnstile';
import type { ActualiteData, Block, ContactBlock, DynamicZoneSource, HomeData, PageData } from '@/types/strapi';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function findContactBlock(blocks: Block[] | undefined, blockId: number): ContactBlock | undefined {
    return blocks?.find((b): b is ContactBlock => b.__component === 'page-builder.contact' && b.id === blockId);
}

// Récupère l'EmailDestination du bloc Contact directement depuis Strapi (jamais depuis le client),
// pour empêcher qu'une requête forgée ne fasse envoyer un e-mail vers une adresse arbitraire.
async function getTrustedDestination(source: DynamicZoneSource, blockId: number): Promise<string | undefined> {
    if (source.type === 'home') {
        const res = await getHome() as { data: HomeData };
        return findContactBlock(res.data?.dynamicZone, blockId)?.EmailDestination;
    }
    if (source.type === 'page') {
        const res = await getPage(source.slug) as { data: PageData[] };
        return findContactBlock(res.data?.[0]?.Contenu, blockId)?.EmailDestination;
    }
    if (source.type === 'actualite') {
        const res = await getActualite(source.slug) as { data: ActualiteData[] };
        return findContactBlock(res.data?.[0]?.Contenu, blockId)?.EmailDestination;
    }
    return undefined;
}

function isValidSource(source: unknown): source is DynamicZoneSource {
    if (!source || typeof source !== 'object') return false;
    const s = source as Record<string, unknown>;
    if (s.type === 'home') return true;
    if ((s.type === 'page' || s.type === 'actualite') && typeof s.slug === 'string') return true;
    return false;
}

async function verifyTurnstile(token: string, remoteIp: string | null): Promise<boolean> {
    const secret = getTurnstileSecretKey();
    if (!secret) return false;

    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.append('remoteip', remoteIp);

    try {
        const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });
        const data = await res.json();
        return data?.success === true;
    } catch {
        return false;
    }
}

export async function POST(request: NextRequest) {
    const payload = await request.json().catch(() => null);
    if (!payload) {
        return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
    }

    const { nom, email, sujet, message, prenom, blockId, source, turnstileToken } = payload;

    // Honeypot rempli : on répond succès sans rien envoyer, pour ne pas révéler la détection au robot
    if (typeof prenom === 'string' && prenom.trim() !== '') {
        return NextResponse.json({ ok: true });
    }

    if (
        typeof nom !== 'string' || !nom.trim() ||
        typeof email !== 'string' || !EMAIL_REGEX.test(email) ||
        typeof sujet !== 'string' || !sujet.trim() ||
        typeof message !== 'string' || !message.trim() ||
        nom.length > 200 || sujet.length > 200 || message.length > 5000 ||
        typeof blockId !== 'number' ||
        typeof turnstileToken !== 'string' || !turnstileToken ||
        !isValidSource(source)
    ) {
        return NextResponse.json({ error: 'Merci de renseigner tous les champs obligatoires.' }, { status: 400 });
    }

    const remoteIp = request.headers.get('x-forwarded-for');
    const turnstileValid = await verifyTurnstile(turnstileToken, remoteIp);
    if (!turnstileValid) {
        return NextResponse.json({ error: 'Échec de la vérification anti-robot. Veuillez réessayer.' }, { status: 400 });
    }

    let destination: string | undefined;
    try {
        destination = await getTrustedDestination(source, blockId);
    } catch {
        destination = undefined;
    }

    if (!destination) {
        return NextResponse.json({ error: "Ce formulaire de contact n'est plus disponible." }, { status: 400 });
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        // Le sujet est inséré tel quel dans l'en-tête ; on retire les retours à la ligne pour éviter toute injection
        const safeSubject = sujet.replace(/[\r\n]+/g, ' ').slice(0, 200);

        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL ?? 'Site JM Courtois <onboarding@resend.dev>',
            to: destination,
            replyTo: email,
            subject: `[Contact site Jm-Courtois] ${safeSubject}`,
            text: `Nom : ${nom}\nEmail : ${email}\n\n${message}`,
        });

        if (error) {
            return NextResponse.json({ error: "L'envoi de l'e-mail a échoué. Veuillez réessayer plus tard." }, { status: 502 });
        }
    } catch {
        return NextResponse.json({ error: "L'envoi de l'e-mail a échoué. Veuillez réessayer plus tard." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
}
