# Shopping Feed Shared Library

The library contains shared parts of Shopping Feed applications.

## Building

If using from the source root, the library should built before usage.

`ng build sfl-shared`

## Getting started

To use major number of modules, you need to import the SflSharedModule to your app.module.ts.

```typescript
import { NgModule } from 'angular/core';
import { SflSharedModule } from 'sfl-shared';

@NgModule({
    imports: [
        SflSharedModule.forRoot({
            baseHref: '/base/href/',
            languageOptions: {en: 'English', fr: 'French'},
            sflApi: 'https://api.shopping-feed.com',
            sflAppToken: 'Bearer appToken',
            sflLegacyLink: 'https://app.shopping-feed.com',
        }),
    ]
})
class AppModule {
}
```

Please, see the documentation to get the information about components, directives and services. 

## Documentation

You can view the documentation by running

`npm run library-docs`

It will open in your browser.
