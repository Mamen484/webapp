export class Permission {
    ads: string;
    affiliation: string;
    buyline: string;
    chat: string;
    facturation: string;
    marketplaces: string;
    multiple: string;
    owner: string;
    retargeting: string;
    shopbots: string;
    solomo: string;
    statistics: string;
    timeline: string;
    tools: string;
    university: string;

    static createForAdmin() {
        return Object.assign(new Permission(), {
            ads: '*',
            affiliation: '*',
            buyline: '*',
            facturation: '*',
            marketplaces: '*',
            multiple: '*',
            owner: '*',
            retargeting: '*',
            shopbots: '*',
            solomo: '*',
            statistics: '*',
            timeline: '*',
            tools: '*',
        });
    }
}
