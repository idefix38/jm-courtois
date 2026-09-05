"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => [
    'strapi::logger',
    'strapi::errors',
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'connect-src': ["'self'", 'https:'],
                    'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io'],
                    'media-src': ["'self'", 'data:', 'blob:'],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    {
        name: 'strapi::cors',
        config: {
            headers: '*',
            origin: [
                'http://localhost:3000',
                'http://frontend:3000',
                'http://frontend.jm-courtois.local',
                // URL publique du frontend en production (ex: https://www.jm-courtois.com)
                ...(env('CLIENT_URL') ? [env('CLIENT_URL')] : []),
            ],
        },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];
//# sourceMappingURL=middlewares.js.map