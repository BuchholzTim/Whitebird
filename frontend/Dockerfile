# build environment - needed as a node-gyp sub-dependency exists, which cannot be resolved with the alpine image
FROM node:14 as build-stage
LABEL stage="builder"

# Working Directoy
WORKDIR /app

# Backend Server Location
ENV API_URL='http://localhost:40001/'
ENV SOCKET_URL='http://localhost:40001/'

# Frontend Host
ENV FRONTEND_HOST='http://localhost:40000'

# Copy Needed Files for Dependencies
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

# Install with YARN
RUN yarn install

# Copy Source Files
COPY ./ ./

RUN yarn generate

FROM node:14-alpine as production-stage

WORKDIR /app

# This makes Nuxt available from every IP & Sets the Port internally of docker.
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/node_modules ./node_modules
COPY ./ ./

# RUN yarn install
CMD [ "yarn", "start"]
