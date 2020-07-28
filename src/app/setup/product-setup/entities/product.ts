import { CatalogProduct } from './catalog-product';
import { MappedChannelCategory } from './mapped-channel-category';
import { ConfigurationState } from '../../configuration-state';

export interface Product {
    id: number;
    feedId: number;
    catalogProduct: CatalogProduct;
    categoryMappedChannelCategory: MappedChannelCategory;
    state: ConfigurationState;
    productMappedChannelCategory: MappedChannelCategory;
}
