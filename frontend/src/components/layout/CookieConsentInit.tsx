'use client';

import { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

// Répercute le choix de l'utilisateur sur le Consent Mode de Google (lu par GTM/GA)
function updateGtagConsent() {
    window.gtag?.('consent', 'update', {
        analytics_storage: CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied',
    });
}

export default function CookieConsentInit() {
    useEffect(() => {
        CookieConsent.run({
            guiOptions: {
                consentModal: { layout: 'box', position: 'bottom right', equalWeightButtons: true },
                preferencesModal: { layout: 'box', equalWeightButtons: true },
            },
            categories: {
                necessary: { readOnly: true, enabled: true },
                analytics: {},
            },
            onFirstConsent: updateGtagConsent,
            onConsent: updateGtagConsent,
            onChange: updateGtagConsent,
            language: {
                default: 'fr',
                translations: {
                    fr: {
                        consentModal: {
                            title: 'Nous respectons votre vie privée 🍪',
                            description:
                                "Ce site utilise des cookies strictement nécessaires à son fonctionnement et, si vous l'acceptez, des cookies analytiques permettant de mesurer l'audience du site.",
                            acceptAllBtn: 'Tout accepter',
                            acceptNecessaryBtn: 'Tout refuser',
                            showPreferencesBtn: 'Personnaliser',
                        },
                        preferencesModal: {
                            title: 'Centre de préférences des cookies',
                            acceptAllBtn: 'Tout accepter',
                            acceptNecessaryBtn: 'Tout refuser',
                            savePreferencesBtn: 'Enregistrer mes choix',
                            closeIconLabel: 'Fermer',
                            serviceCounterLabel: 'Service(s)',
                            sections: [
                                {
                                    title: 'Utilisation des cookies',
                                    description:
                                        "Nous utilisons des cookies pour garantir le bon fonctionnement du site et, avec votre accord, des cookies analytiques (Google Tag Manager) pour comprendre comment le site est utilisé.",
                                },
                                {
                                    title: 'Cookies strictement nécessaires',
                                    description: 'Indispensables au fonctionnement du site, ils ne peuvent pas être désactivés.',
                                    linkedCategory: 'necessary',
                                },
                                {
                                    title: 'Cookies analytiques',
                                    description:
                                        "Permettent de mesurer l'audience du site (pages visitées, provenance des visiteurs) via Google Tag Manager, de façon anonyme.",
                                    linkedCategory: 'analytics',
                                },
                            ],
                        },
                    },
                },
            },
        });
    }, []);

    return null;
}
