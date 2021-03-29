// The production environment variables are set in the sfc-initialize component

declare var SFC_API_LINK: string;
declare var SFC_WEB_APP_LINK: string;

export const environment = {
    production: true,
    hmr: false,
    apiLink: SFC_API_LINK,
    webAppLink: SFC_WEB_APP_LINK,
    GTM_ID: 'GTM-KKGPJKX',
    'zendeskAccountLink': 'shoppingfeed.zendesk.com'
}
