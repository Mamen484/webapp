import { CreateStoreFeed } from './create-store-feed';
import { StoreOwner } from 'sfl-shared/src/lib/core/entities';

export class CreateStoreModel {
    id?: number;
    storeId = 0;
    owner: StoreOwner = {
        email: '',
        login: '',
        password: '',
        token: '',
    };
    feed = new CreateStoreFeed();
    country = '';

    static createFromResponse(data, name) {
        return Object.assign(new CreateStoreModel(), {
            storeId: data.storeId,
            owner: {
                email: data.email,
                login: name,
                password: '',
                token: data.token,
            },
            feed: {
                url: data.feed,
                source: 'shopify',
                mapping: {
                    'category': 'category',
                    'brand': 'brand',
                    'brand-link': 'brand-link',
                    'reference': 'id',
                    'name': 'name',
                    'link': 'uri',
                    'description': 'description',
                    'short_description': 'short_description',
                    'price': 'price',
                    'old_price': 'old-price',
                    'shipping_cost': 'shipping-cost',
                    'shipping_time': 'shipping-time',
                    'quantity': 'quantity',
                    'ean': 'barcode',
                    'weight': 'weight',
                    'ecotax': 'ecotax',
                    'tva': 'vat'
                },
                settings: {
                    xmlProductNode: 'product'
                }
            },
            country: data.language,
        });
    }
}
