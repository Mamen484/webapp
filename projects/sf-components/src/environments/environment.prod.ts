// The production environment variables are set in the sfc-initialize component

declare var SFC_API_LINK: string;
declare var SFC_WEB_APP_LINK: string;

export const environment = {
    production: true,
    hmr: false,
    apiLink: SFC_API_LINK,
    webAppLink: SFC_WEB_APP_LINK,
    'googleAnalyticsMeasurmentId': 'UA-78261662-1',
    'zendeskAccountLink': 'shoppingfeed.zendesk.com'
}
