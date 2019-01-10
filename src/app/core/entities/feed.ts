export interface Feed {
    id: number;
    catalogId: number;
    channelId: number;
    country: string;
    state: 'active' | 'inactive' | 'closed';
}
