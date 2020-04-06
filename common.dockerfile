## We use this configuration to get a kubernetes build of WebApp on a testing environment.
# Step 1: build an angular application
FROM node:12-alpine as node


# Installs latest Chromium package
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
        chromium \
        harfbuzz@edge \
        nss@edge \
        freetype@edge \
        ttf-freefont@edge

# This line is to tell karma-chrome-launcher where
# chromium was downloaded and installed to.
ENV CHROME_BIN /usr/bin/chromium-browser

# Tell Puppeteer to skip installing Chrome.
# We'll be using the installed package instead.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Telling node-sass which pre-built binary to fetch.
# This way we don't need rebuilding node-sass each time!
ENV SASS_BINARY_NAME=linux-x64-67

RUN apk update && apk add zip curl

WORKDIR /app

COPY ./ /app/
RUN npm i

ARG env=prod

RUN npm run build-lib

# test libs code, sf libraries must provide 100% coverage
RUN ./node_modules/.bin/ng test sfl-shared --code-coverage --watch false --browsers=ChromeHeadlessCI
RUN ./node_modules/.bin/ng test sfl-tools --code-coverage --watch false --browsers=ChromeHeadlessCI
