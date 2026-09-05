// Clés de test Cloudflare : valides sur n'importe quel domaine (dont localhost), toujours acceptées côté siteverify.
// https://developers.cloudflare.com/turnstile/troubleshooting/testing/
const TEST_SITE_KEY = '1x00000000000000000000AA';
const TEST_SECRET_KEY = '1x0000000000000000000000000000000AA';

const isProduction = process.env.NODE_ENV === 'production';

export function getTurnstileSiteKey(): string {
    return isProduction ? (process.env.TURNSTILE_API_KEY ?? '') : TEST_SITE_KEY;
}

export function getTurnstileSecretKey(): string {
    return isProduction ? (process.env.TURNSTILE_SECRET_KEY ?? '') : TEST_SECRET_KEY;
}
