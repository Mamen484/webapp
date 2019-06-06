export interface ChannelAttribute {
    id: number;
    taxonomyId: number;
    channelId: number;
    country: string;
    name: string;
    isRequired: boolean;
    constraintGroupId?: number;
    defaultMapping?: string;
}
