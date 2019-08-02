// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    SFA_API: '//api.shopping-feed.lan/v1',
    SFA_BILLING_API: '//api.shopping-feed.lan/v1/billing',
    APP_TOKEN: 'Bearer 33bb2cc5944579049fcdcaddb3144886726cfb9b',
    SFA_LEGACY_LINK: '//app.shopping-feed.lan',
    WEBAPP_URL: '//localhost:4200/v3/en',
    defaultFeedSource: 'https://raw.githubusercontent.com/shoppingflux/feed-xml/develop/examples/full.xml',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
