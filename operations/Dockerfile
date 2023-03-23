FROM node:16.0.0 AS build

# Install essential tools
RUN apt-get -qq update && \
  apt-get -qq install sudo && \
  apt-get -qq install apt-transport-https && \
  apt-get -qq install build-essential && \
  apt-get -qq install git

ARG GITHUB_TOKEN
COPY operations/.npmrc /tmp/app/.npmrc

ENV ENV=production

COPY . /tmp/app

WORKDIR /tmp/app
RUN yarn install
RUN yarn cache clean
RUN yarn build

FROM nginx

# COPY --from=build /tmp/app/public /usr/share/nginx/html
# COPY operations/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /tmp/app/public /usr/www
COPY operations/nginx.conf /etc/nginx/nginx.conf
