#!/bin/bash
for lang in $LOCALES; do \
        LOCALE_ID=$lang production=true npx ts-node compile-environment.ts && \
        npx ng build --output-path=dist/webapp/$BASE_HREF/$lang \
                 --prod \
                 --aot \
                 --output-hashing all \
                 --source-map false \
                 --build-optimizer true \
                 --base-href $BASE_HREF/$lang/ \
                 --i18n-locale=$lang \
                 --i18n-file=src/locale/messages.$lang.xlf \
                 --i18n-format=xlf
      done