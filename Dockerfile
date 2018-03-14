## Production configuration
## Step 1: install Crowdin and download translations
FROM openjdk:7 as java
WORKDIR /locale
RUN  apt-get update && \
 wget -qO - https://artifacts.crowdin.com/repo/GPG-KEY-crowdin | apt-key add - && \
 echo "deb https://artifacts.crowdin.com/repo/deb/ /" > /etc/apt/sources.list.d/crowdin.list && \
 apt-get install apt-transport-https && \
 apt-get update && apt-get install crowdin
COPY crowdin.yaml /locale
ARG CROWDIN_API_KEY
RUN crowdin download

# Step 2: build an angular application
FROM node:8.9 as node
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY ./ /app/
# copy translations from crowdin /locale folder into /app
COPY --from=java /locale /app/src/locale

ARG env=prod
ARG LOCALES="en fr es pt de it"

# variables from environments/environment.ts

ARG DEFAULT_LANGUAGE
ARG APP_URL
ARG APP_AUTHORIZATION
ARG API_URL_WITHOUT_VERSION
ARG API_URL
ARG BASE_HREF='/v3'
ARG DEFAULT_AUTHORIZATION
ARG SHOPIFY_APP_URL
ARG SUPPORT_URL
ARG SUPPORT_AUTHORIZATION
ARG CONTACT_EMAIL
ARG SUPPORT_EMAIL
ARG DEFAULT_AUTOPILOT_EMAIL
ARG DEFAULT_AUTOPILOT_STORENAME

RUN npm run compile-env

RUN chmod +x ./build-multiple-locales.sh
RUN ./build-multiple-locales.sh

#Step 3: copy files of compiled webapp to the nginx served folder and serve files with nginx
FROM nginx:1.13

COPY --from=node /app/dist/ /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf