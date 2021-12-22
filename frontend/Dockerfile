FROM node:17
WORKDIR /code
ENV NODE_OPTIONS=--openssl-legacy-provider
COPY package.json /code/package.json
COPY yarn.lock /code/yarn.lock
RUN yarn install