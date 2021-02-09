#!/bin/bash
ng build sf-components --prod --extract-css false --output-hashing none
mkdir dist/sf-components/publish

for LANG in en-ng en fr it es de pt
do
  DIR_PATH=dist/sf-components/$LANG
  cat $DIR_PATH/main-es2015.js $DIR_PATH/polyfills-es2015.js $DIR_PATH/runtime-es2015.js $DIR_PATH/styles-es2015.js > dist/sf-components/publish/sf-components.$LANG.js
done
cp dist/sf-components/publish/sf-components.en.js dist/sf-components/publish/sf-components.us.js
cp projects/sf-components/readme.md dist/sf-components/publish/readme.md
