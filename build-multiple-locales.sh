#!/bin/bash
for lang in $LOCALES; do \
        LOCALE_ID=$lang production=true npx ts-node compile-environment.ts && \
        npx ng build --output-path=dist$BASE_HREF/$lang \
                 --prod \
                 --bh $BASE_HREF/$lang/ \
                 --locale=$lang \
                 --i18nFile=src/locale/messages.$lang.xlf \
                 --i18nFormat=xlf
      done