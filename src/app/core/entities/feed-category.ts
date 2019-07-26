import { Category } from './category';
import { CategoryState } from '../../channel-setup/category-state';

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
    state: CategoryState;
}
