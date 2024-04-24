FROM node:lts-alpine AS prod

ARG UID=1000
ARG GID=1000

RUN apk add --update --no-cache \
    libc6-compat \
    gcompat \
    mesa-dev \
    libxi

RUN deluser node && \
    addgroup -g $GID node && \
    adduser -u $UID -G node -s /bin/sh -D node

USER node

WORKDIR /usr/src/app
