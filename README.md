# Shopping Feed UI

This project was generated with [@angular/cli](https://github.com/angular/angular-cli).

It contains Shopping Feed UI projects:

- webapp (client's application)
- admin app
- sfl-shared - library that contains shared between SF apps logic

Note, that all apps requiresfl-shared, so you need to build it before apps.
For the library documentation, please, see projects/sfl-shared/README.md.

## Prerequisutes

Before running/building any app you need to install packages and a shared Shopping Feed library

`npm install`

`ng build --sfl-shared`

Also you need to have a backend you need to install API and Shopify Network:

https://github.com/shoppingflux/docker-network-base  
https://github.com/shoppingflux/api  
https://github.com/shoppingflux/app-billing

For the local setup make sure you have all the hosts in your /etc/hosts:
```
127.0.0.1   app.shopping-feed.lan
127.0.0.1   admin.shopping-feed.lan

And the ones needed for the backend.
```
## Running a development server in a docker
To run a development server in a docker container:
`docker-compose up -d`
The webapp will be accessible on address http://app.shopping-feed.lan/v3/en.
The admin app will be accessible on address http://admin.shopping-feed.lan/en.


## Development server for a Shopping Feed webapp without a docker
Run `npm start`. Navigate to `http://localhost:4200/v3/en`. The app will automatically reload if you change any of the source files.

## Development server for a Shopping Feed Admin app without a docker
Run `npm run sf-admin`. Navigate to `http://localhost:4201/en`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component.
Consult angular cli docs for more commands `ng g -h`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

##CI Build

When we build the code on a CI environment, we may need to pass environment variables to the build script.
Run `npm run compile-env path/to/environment.ts`, passing environment variables before. It will create environment.prod.ts with all needed environment variables and run the production build.
Please, see build-multiple-locales.sh to see all options of the build.

`DEFAULT_AUTHORIZATION=some_url SHOPIFY_APP_URL=some_another_url npm run compile-env`
`ng build webapp -prod`

It will set DEFAULT_AUTHORIZATION and SHOPIFY_APP_URL as you specified in the command, all the other variables will be taken from environment.ts file.

## Running unit tests

Run `ng test {project = webapp | sf-admin | sfl-shared}` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `@angular/cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

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

### Adding an asset

A very hard task in the build process is adding an asset in it the package.
Here's a small advice on how to add one without loosing a day:

The assets are defined in `./angular-cli.json`, in  `apps.assets`.

If you want to add a directory or a file, just name it as a string.

example:
```json
{
    "apps": {
        "assets": [
          "my_directory_or_file"
        ]
    }
}
```

#### Add a dependency from another directory

Angular/cli supports a way to add files from another directory that isn't `src`.

It can be done by defining an object:
```json
{
    "apps": {
        "assets": [
          // Remember that "input" is a relative path from src/
          {"glob": "my_file", "input": "../node_modules/foo/bar", "output": "a_dir_name_in_dist"},
          {"glob": "my_directory/**/*", "input": "../node_modules/foo/bar", "output": "a_dir_name_in_dist"},
        ]
    }
}
```

Here's the trick:
- input: This field is the base directory of the asset, not the path to the asset
- glob: a glob expression leading the file(s). To add a directory, you need to append `/**/*` to the path
- output: The directory name of the asset in dist package. (can be `.`) for root.

##### glob

You can't only use `glob` and `output` to achieve this.
"glob" entry is used as-is by input AND output, that means if you try this:
`{"glob": "../node_modules/foo/bar/my_file", "output": "baz"},`

the output file will be placed in: `dist/baz/../node_modules/foo/bar/my_file`, not in "baz".

##### input

You can't use only input, if your only provide input, webpack will explore your fs recursively from `src` to `/` and
 will fail when reading a root-only dir (`/lost+found` or `/root`, `/proc/1/map_files/**` in docker).