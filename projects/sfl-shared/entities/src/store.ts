import { Permission } from './permission';
import { StoreStatus } from './store-status.enum';
import { StoreOwner } from './store-owner';
import { StoreFeed } from './store-feed';
import { PaymentType } from './payment-type.enum';
import { SquarespaceStore } from './squarespace-store';

const DAY = 1000 * 60 * 60 * 24;
const WEEK = 7 * DAY;

export class Store {
    id?: number;
    storeId?: number; // for posting a new store
    name?: string;
    status?: StoreStatus;
    permission?: Permission;
    owner = new StoreOwner();
    feed = new StoreFeed();
    country = '';
    createdAt?: string;
    paymentType ? = PaymentType.other;
    sales?: { pathIsActive: boolean };
    _links?: {
        self: {
            href: string
        }
    };
    _embedded?: {
        order: {
            newCount: number;
        }
    };

    static storeIsNew(store): boolean {
        return Boolean(store.createdAt) && new Date(store.createdAt).getTime() > (new Date().getTime() - WEEK);
    }

    static createFromResponse(data, name, feedSource = 'shopify'): Store {
        return Object.assign(new Store(), {
            storeId: data.storeId,
            owner: {
                email: data.email,
                login: name,
                password: '',
                token: data.token || data.sfToken,
                phone: data.phone,
            },
            feed: {
                url: data.feed,
                source: feedSource,
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

    static createForSquarespace(data: SquarespaceStore, name) {
        return Object.assign(new Store(), {
            storeId: data.storeId,
            owner: {
                login: name,
                token: data.sfToken,
                payment: PaymentType.other,
            },
            feed: {
                url: data.feed,
                source: 'squarespace',
                mapping: {
                    'category': 'category',
                    'brand': 'brand',
                    'reference': 'reference',
                    'ean': 'ean',
                    'name': 'name',
                    'link': 'link',
                    'description': 'description',
                    'short_description': 'short_description',
                    'price': 'price',
                    'old_price': 'old_price',
                    'shipping_cost': 'shipping_cost',
                    'shipping_time': 'shipping_time',
                    'quantity': 'quantity',
                    'weight': 'weight',
                    'ecotax': 'ecotax',
                    'tva': 'tva',
                },
                settings: {
                    xmlProductNode: 'product',
                    credentials: {
                        type: 'oauth2',
                        accessToken: data.accessToken,
                        expiryTimeAccessToken: String(data.tokenExpiresAt),
                        refreshToken: data.refreshToken,
                        expiryTimeRefreshToken: String(data.tokenExpiresAt),
                    }
                }
            },
            country: data.language === 'en' ? 'us' : data.language,
            paymentType: undefined,
        });
    }

}
