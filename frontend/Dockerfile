# build environment - needed as a node-gyp sub-dependency exists, which cannot be resolved with the alpine image
FROM node:14 as build-stage

# Working Directoy
WORKDIR /app

# Copy Needed Files for Dependencies
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

# Install with YARN
RUN yarn install

# Copy Source Files
COPY ./ ./

RUN yarn generate

FROM node:14-alpine as production-stage

COPY --from=build-stage /app/dist /app/dist
COPY ./ /app/

CMD [ "npx", "serve", "app/dist" ]
