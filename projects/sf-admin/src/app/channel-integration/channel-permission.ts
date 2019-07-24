export interface ChannelPermission {
    id: number;
    accountId: number;
    channelId: number;
    allow: string[];
    _embedded: {
        account: { name: string };
        channel: { name: string, lastModifiedAt: string };
    }
}
