#!/bin/bash
VERSION="patch";
for arg in "$@"
do
    case $arg in
        --upgrade-version=*|-v=*)
        VERSION="${arg#*=}";
        ;;
        --upgrade-version|-v)
        VERSION=$2;
        ;;
    esac
done

if [[ "$VERSION" != "patch" && "$VERSION" != "minor"  && "$VERSION" != "major" ]]
then
  echo "Invalid version specify. Please, use --upgrade-version=major|minor|patch";
  exit
fi

cd projects/sf-components/ && npm version "$VERSION" && cd ../..
cp projects/sf-components/package.json dist/sf-components/publish/package.json
cd dist/sf-components/publish && npm publish
