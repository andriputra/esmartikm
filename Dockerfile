FROM node:lts-alpine AS prod

# Set build arguments for user and group IDs
ARG UID=1000
ARG GID=1000

# Install necessary packages
RUN apk add --update --no-cache \
    libc6-compat \
    gcompat \
    mesa-dev \
    libxi

# Remove the default 'node' user and create a new one with the specified UID and GID
RUN deluser node && \
    addgroup -g $GID node && \
    adduser -u $UID -G node -s /bin/sh -D node

# Switch to the newly created 'node' user
USER node

# Set the working directory
WORKDIR /usr/src/app

# Copy the .env file into the Docker image
COPY .env .

# Set environment variables from the .env file
ENV API_URL=$API_URL
ENV PASSPORT_CLIENT_ID=$PASSPORT_CLIENT_ID
ENV PASSPORT_CLIENT_SECRET=$PASSPORT_CLIENT_SECRET
ENV NODE_TLS_REJECT_UNAUTHORIZED=$NODE_TLS_REJECT_UNAUTHORIZED
