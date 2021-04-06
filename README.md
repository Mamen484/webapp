# Shoppingfeed Web

This project was generated with [@angular/cli](https://github.com/angular/angular-cli).

Here is a monorepo for Shoppingfeed Web projects.
If contains:

- webapp (client's application)
- admin app (sf-admin)
- operator app (channel-settings)
- sfl-shared - library that contains services/entities shared between Shoppingfeed apps
- sfl-tools - library that contains useful shared tools
- sfui - Shoppingfeed UI library
- tracking-tools - a component to easily load tracking tools like Google Analytics or Google Tags Manager

## Prerequisutes

You need to have a backend you need to install API and Shopify Network:

https://github.com/shoppingflux/docker-network-base  
https://github.com/shoppingflux/api  
https://github.com/shoppingflux/app-billing

Also you need the legacy app
https://github.com/shoppingflux/legacy

For the local setup make sure you have all the hosts in your /etc/hosts:
```
127.0.0.1   app.shopping-feed.lan

And the ones needed for the backend.
```
## Running a development server in a docker
To run a development server in a docker container:
`docker-compose up -d`
The webapp will be accessible on address http://app.shopping-feed.lan/v3/en.

## Running webapp for a development

### Install all needed dependencies

`npm install`

### Build the libraries

`npm run build-lib`

### Serve the app
`npm start`

## Translation

We use crowdin tool for translation : https://support.crowdin.com.

### Installation

You can install console client by following this guide : https://support.crowdin.com/cli-tool/.

### Configuration

On linux, you have to create a file $HOME/.crowdin.yaml with your credential :

api_key: <YOUR_API_KEY>

For more information : https://support.crowdin.com/configuration-file/#cli-2

### Usage

- Generates and upload translation file:
    - `./node_modules/.bin/ng-xi18n  -p src/tsconfig.json`
    - `crowdin upload sources`

- Fetch latest translations
    - `crowdin download`
