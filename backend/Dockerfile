# build environment
FROM node:14-alpine

# Working Directoy
WORKDIR /app

# Copy Needed Files for Dependencies
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

# Install with YARN
RUN yarn install

# Copy Source Files
COPY ./ ./

RUN yarn build

# start:prod Script
CMD [ "yarn", "start:prod" ]
