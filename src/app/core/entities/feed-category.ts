import { Category } from './category';
import { ConfigurationState } from '../../setup/configuration-state';

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
    state: ConfigurationState;
}
