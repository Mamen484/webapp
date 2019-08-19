#!/bin/bash
for lang in $LOCALES; do \
        LOCALE_ID=$lang production=true npx npm run compile-env projects/sf-admin/src/environments && \
        npx ng build sf-admin --output-path=dist/$lang \
                 --prod \
                 --aot \
                 --output-hashing all \
                 --source-map false \
                 --build-optimizer true \
                 --base-href /$lang/
#                 --i18n-locale=$lang \
#                 --i18n-file=src/locale/messages.$lang.xlf \
#                 --i18n-format=xlf
      done