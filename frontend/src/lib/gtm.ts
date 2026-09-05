declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
    }
}

// Envoie un évènement au dataLayer GTM (no-op côté serveur)
export function pushToDataLayer(event: string, params: Record<string, unknown> = {}) {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
}
