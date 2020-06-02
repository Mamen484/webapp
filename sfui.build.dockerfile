## We use this configuration to get a kubernetes build of WebApp on a testing environment.
# Step 1: build an angular application
ARG imageName
# use sfeed-webbase for a local build and eu.gcr.io/kube-196515/sfeed-webbase-{branch-name} for kube build
FROM ${imageName} as base

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
ARG RUN_AUTOPILOT
ARG showCovid19Banner


# download translations
ARG CROWDIN_API_KEY
RUN curl https://api.crowdin.com/api/project/shoppingfeed-webapp/export?key=$CROWDIN_API_KEY
RUN curl https://api.crowdin.com/api/project/shoppingfeed-webapp/download/all.zip?key=$CROWDIN_API_KEY -o all.zip
RUN unzip -o all.zip

RUN npm run compile-env

# test webapp
RUN ./node_modules/.bin/ng test webapp --watch false --browsers=ChromeHeadlessCI

RUN npx npm run compile-env
RUN npx ng build webapp --configuration production

#Step 3: copy files of compiled webapp to the nginx served folder and serve files with nginx
FROM nginx:1.13

COPY --from=base /app/dist/webapp/ /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
