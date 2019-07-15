import { Category } from './category';

export interface CatalogCategory {
    id: number;
    catalogId: number;
    name: string;
}

export interface FeedCategory {
    catalogCategory: CatalogCategory,
    channelCategory: Category,
    feedId: number;
    id: number;
}
