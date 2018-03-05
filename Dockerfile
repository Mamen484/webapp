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

FROM node:8.9 as node
WORKDIR /app


COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY ./ /app/
COPY --from=java /locale /app/src/locale

ARG env=prod
ARG LOCALES="en fr es pt de it"

RUN npm run compile-env

RUN chmod +x ./build-multiple-locales.sh
RUN ./build-multiple-locales.sh

FROM nginx:1.13

COPY --from=node /app/dist/ /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf