FROM node:24-alpine

ARG ARCH

# FIXUID
RUN apk update && apk add --no-cache curl git build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev su-exec

RUN USER=node && \
    GROUP=node && \
    curl -SsL https://github.com/boxboat/fixuid/releases/download/v0.5.1/fixuid-0.5.1-linux-${ARCH}64.tar.gz | tar -C /usr/local/bin -xzf - && \
    chown root:root /usr/local/bin/fixuid && \
    chmod 4755 /usr/local/bin/fixuid && \
    mkdir -p /etc/fixuid && \
    printf "user: $USER\ngroup: $GROUP\n" > /etc/fixuid/config.yml

RUN mkdir -p /usr/app && \
    git config --global --add safe.directory /usr/app && \
    chown -R node:node /usr/app

WORKDIR /usr/app

COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
