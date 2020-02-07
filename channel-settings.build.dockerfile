## We use this configuration to get a kubernetes build of sf-admin on a testing environment.
# Step 1: build an angular application
ARG imageName
# use sfeed-webbase for a local build and eu.gcr.io/kube-196515/sfeed-webbase-{branch-name} for kube build
FROM ${imageName} as base

ARG LOCALES="en"

# variables from environments/environment.ts

ARG apiLink
ARG apiToken
ARG legacyLink
ARG webappLink
ARG countriesLink

RUN npm run compile-env projects/channel-settings/src/environments

RUN ./node_modules/.bin/ng test channel-settings --code-coverage --watch false --browsers=ChromeHeadlessCI

RUN chmod +x ./build-channel-settings.sh
RUN sh build-channel-settings.sh

#Step 3: copy files of compiled app to the nginx served folder and serve files with nginx
FROM nginx:1.13

COPY --from=base /app/dist/ /usr/share/nginx/html

COPY ./nginx-channel-settings.conf /etc/nginx/conf.d/default.conf
