#!/bin/sh
set -ex

# Corriger les permissions des dossiers bind-montés (fichiers root créés par des runs précédents)
chown -R node:node /usr/app/src /usr/app/public 2>/dev/null || true

# Remap node UID/GID pour correspondre à l'utilisateur hôte
eval $( su-exec node fixuid -q )

id -u
id -g

if [ ! -f "node_modules/.bin/strapi" ]; then
    echo "Node modules not installed or incomplete. Installing..."
    echo "$PWD"
    su-exec node npm i
fi

exec su-exec node "$@"