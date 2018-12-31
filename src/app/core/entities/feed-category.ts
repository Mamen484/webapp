import { FeedCategoryMap } from './feed-category-map';
import { ChannelCategory } from 'sfl-shared/entities';

export interface FeedCategory {
    id: number;
    catalogId: number;
    name: string;
    categoryMap: FeedCategoryMap;
    channelCategory: ChannelCategory;
}
