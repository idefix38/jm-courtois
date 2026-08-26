"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            host: env('DATABASE_HOST', '127.0.0.1'),
            port: parseInt(env('DATABASE_PORT', '5432'), 10),
            database: env('DATABASE_NAME', 'jm-courtois'),
            user: env('DATABASE_USERNAME', 'user'),
            password: env('DATABASE_PASSWORD', 'password'),
            ssl: false,
        },
        pool: { min: 2, max: 10 },
    },
});
//# sourceMappingURL=database.js.map