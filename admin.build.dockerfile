## We use this configuration to get a kubernetes build of sf-admin on a testing environment.
# Step 1: build an angular application
ARG imageName
# use sfeed-webbase for a local build and eu.gcr.io/kube-196515/sfeed-webbase-{branch-name} for kube build
FROM ${imageName} as base

ARG LOCALES="en"

# variables from environments/environment.ts

ARG SFA_API
ARG SFA_BILLING_API
ARG APP_TOKEN
ARG SFA_LEGACY_LINK
ARG WEBAPP_URL
ARG channelOperatorLink
ARG defaultFeedSource
ARG countriesListLink

RUN npm run compile-env projects/sf-admin/src/environments

# test sf-admin, tracking code coverage
RUN ./node_modules/.bin/ng test sf-admin --code-coverage --watch false --browsers=ChromeHeadlessCI

RUN chmod +x ./build-admin.sh
RUN sh build-admin.sh

#Step 3: copy files of compiled webapp to the nginx served folder and serve files with nginx
FROM nginx:1.13

COPY --from=base /app/dist/ /usr/share/nginx/html

COPY ./nginx-admin.conf /etc/nginx/conf.d/default.conf
