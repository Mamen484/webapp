#!/bin/bash
ng build sfui-web-components --prod --extract-css false --output-hashing none
mkdir dist/sfui-web-components/publish

DIR_PATH=dist/sfui-web-components
cat $DIR_PATH/main.js $DIR_PATH/polyfills.js $DIR_PATH/runtime.js $DIR_PATH/styles.js > $DIR_PATH/publish/sfui.js
cp projects/sfui-web-components/readme.md dist/sfui-web-components/publish/readme.md
