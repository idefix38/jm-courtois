# jm-courtois

## Déploiement en production

Le site est prévu pour tourner en conteneurs Docker sur un serveur qui héberge déjà d'autres sites (reverse-proxy + certbot existants). Le workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) construit les images `frontend` et `cms`, les pousse sur `ghcr.io`, puis se connecte en SSH au serveur pour les déployer.

### Une seule fois, sur le serveur

1. Cloner le repo à l'emplacement prévu (`DEPLOY_PATH`).
2. Créer `.env.production` (racine), `cms/.env.production` et `frontend/.env.production` à partir des fichiers `*.env.production.example` correspondants, avec des secrets de production **différents** de ceux du `.env` de dev (APP_KEYS, JWT secrets, mots de passe DB...). `PREVIEW_SECRET` doit être identique côté `cms` et `frontend`.
3. Ajouter deux server blocks au reverse-proxy déjà en place, pointant vers le port loopback exposé par notre `nginx` (`127.0.0.1:${NGINX_PROD_PORT:-8090}` par défaut), pour `www.jm-courtois.com` et `cms.jm-courtois.com`, puis générer les certificats via le certbot déjà installé.
4. Premier démarrage manuel : `docker compose --env-file .env.production -f docker-compose.prod.yml up -d`.
5. Créer le compte admin Strapi sur `https://cms.jm-courtois.com/admin`, générer un token API de production (Settings > API Tokens) et le renseigner dans `frontend/.env.production` (`STRAPI_API_TOKEN`), puis `docker compose --env-file .env.production -f docker-compose.prod.yml up -d frontend`.

### Secrets GitHub à configurer (Settings > Secrets and variables > Actions)

- **Secrets** : `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_PORT` (optionnel, 22 par défaut).
- **Variables** : `DEPLOY_PATH` (chemin du repo sur le serveur), `NEXT_PUBLIC_STRAPI_URL` (ex: `https://cms.jm-courtois.com`, valeur publique inlinée dans le bundle au build).

### À chaque push sur `main`

Le workflow construit et pousse les images (tag `latest` + SHA du commit), puis exécute sur le serveur : `git reset --hard`, `docker compose pull`, `docker compose up -d --remove-orphans`.

