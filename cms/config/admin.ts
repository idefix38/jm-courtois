export default ({ env }: { env: any }) => ({
    auth: {
        secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
        salt: env('API_TOKEN_SALT'),
    },
    transfer: {
        token: {
            salt: env('TRANSFER_TOKEN_SALT'),
        },
    },
    preview: {
        enabled: true,
        config: {
            allowedOrigins: env('CLIENT_URL'),
            async handler(uid: string, { documentId, locale, status }: { documentId?: string; locale?: string; status: string }) {
                const clientUrl = env('CLIENT_URL');
                const previewSecret = env('PREVIEW_SECRET');

                const buildPreviewUrl = (path: string) => {
                    const params = new URLSearchParams({ secret: previewSecret, uid, status, path });
                    return `${clientUrl}/api/preview?${params.toString()}`;
                };

                if (uid === 'api::home-page.home-page') {
                    return buildPreviewUrl('/');
                }

                if (uid === 'api::livre.livre' && documentId) {
                    const livre = await strapi.documents('api::livre.livre').findOne({ documentId, locale });
                    if (!livre?.Slug) return null;
                    return buildPreviewUrl(`/livres/${livre.Slug}`);
                }

                if (uid === 'api::page.page' && documentId) {
                    const page = await strapi.documents('api::page.page').findOne({ documentId, locale });
                    if (!page?.Url) return null;
                    return buildPreviewUrl(`/${page.Url}`);
                }

                return null;
            },
        },
    },
});
