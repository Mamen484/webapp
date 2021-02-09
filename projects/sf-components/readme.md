# Shoppingfeed Web Components

A Javascript library with web components to be used outside Shoppingfeed Web App.
The web components are the wrappers that allow to reuse Angular components outside the Angular app.

More about web components:
https://developer.mozilla.org/en-US/docs/Web/Web_Components

More about Angular Elements, a tool for building web components on Angular:
https://angular.io/guide/elements

## Installation

1. Create a file .npmrc in a directory with your package.json, containing the text:
    ```
    registry=https://npm.pkg.github.com/shoppingflux
    ```
1. Authenticate requests to install the github package. Add to your ~/.npmrc:
    ```
    //npm.pkg.github.com/:_authToken={token}
    ```
1. Install the package:
    ```
    npm install --save @shoppingfeed/web-components
    ```
1. Add environment variables anywhere in your `head` above the script with web components:
    ```html
       <script>
           const SFC_WEB_APP_LINK='the link to the appropriate localized version of web app';
           const SFC_API_LINK='the link to the SF API';
       </script>
    ```
1. Include the script to the bottom of your `body` tag, or to the `head`, but load it asynchronously.   

## Components

### sfc-initialize

This component does the following things:
- fetches current store information, that will be used by all components that need it
- checks the authentication. If a user is not authenticated, he/she will be redirected to a login page.
- if you have any content that you do not want to show until you show the store dependant web components, you can use class .sfc-defer-display on it and specify the `visibility: hidden` on it. When the store information is received, this class will be removed from all tags and they will become visible.

The component will look for authorization information in your local storage, currently the web components are written to be used on the app from the same domain as Web App.

#### Usage

```html
<sfc-initialize store-id="{storeId}"></sfc-initialize>
```

#### API
| attribute | type | required | description |
| ---- | ---- | ---- | ---- | 
| store-id | integer | yes | specify the current store id here

### sfc-sidebar

Renders the side menu of Shoppingfeed app.

#### Usage

```html
<sfc-sidebar></sfc-sidebar>
```

### sfc-menu-tabs
Renders the submenu tabs.

#### Usage

```html
<sfc-menu-tabs bar="{barName}" active-tab="{tabName}"></sfc-menu-tabs>
```

#### API
| attribute | type | required | description |
| ---- | ---- | ---- | ---- | 
| bar | `stats` &#124; `tools` &#124; `account` | yes | specify which submenu to show |
| active-tab | `StatsTab` &#124; `ToolTab` &#124; `AccountTab` | yes | specify the active tab |

##### active-tab tabs types declaration
```
StatsTab = general | marketplace | shopping-engine | parameters | margin | compare | export
ToolTab = export | export | manage | new-fields | repricing | source-feed | custom-feed | filters | new-products
AccountTab = settings | alerts | membership | access
```
