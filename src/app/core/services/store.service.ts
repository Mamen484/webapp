import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Statistics } from '../entities/statistics';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreChannelResponse } from '../entities/store-channel-response';
import { ChannelsResponse } from '../entities/channels-response';
import { StoreChannel } from '../entities/store-channel';
import { PagedResponse } from '../entities/paged-response';
import { ChannelsRequestParams } from '../entities/channels-request-params';
import { StoreCharge } from '../entities/store-charge';
import { Store } from '../entities/store';
import { fetchStoresMock } from '../../../mocks/fetch-stores-mock';

@Injectable()
export class StoreService {

    constructor(protected httpClient: HttpClient) {
    }

    public getStoreChannels(storeId,
                            params = new ChannelsRequestParams(),
                            foreignChannels = false): Observable<PagedResponse<{ channel: StoreChannel[] }>> {

        let httpParams = new HttpParams()
            .set('page', params.page.toString())
            .set('limit', params.limit.toString())
            .set('country', params.country)
            .set('name', params.searchQuery)
            .set('type', params.type)
            .set('segment', params.segment)
            .set('status', params.status);

        if (foreignChannels) {
            return <any>this.httpClient.get(`${environment.API_URL}/channel`, {params: httpParams})
                .map((data: ChannelsResponse) =>
                    // we need this to have the same data when the user selects a store country, and another country
                    Object.assign({}, data, {
                        _embedded: {
                            channel: data._embedded.channel.map(channel => ({
                                installed: false,
                                _embedded: {channel: channel}
                            }))
                        }
                    }))
                ;
        }
        return this.httpClient.get(`${environment.API_URL}/store/${storeId}/channel`, {params: httpParams})
            .map((data: StoreChannelResponse) =>
                // we use 'channel' property to have the same structure for results in the store country and outside it
                Object.assign({}, data, {_embedded: {channel: data._embedded.storeChannel}}));
    }

    public getStatistics(storeId): Observable<Statistics> {
        return <Observable<Statistics>>this.httpClient.get(`${environment.API_URL}/stat/store/${storeId}`);
    }

    public getStoreCharge(storeId): Observable<{ charge: StoreCharge }> {
        return <Observable<{ charge: StoreCharge }>>this.httpClient.get(`${environment.API_URL}/store/${storeId}/charge`);
    }

    public fetchAvailableStores(filter: string) {
        return Observable.of(fetchStoresMock);
        // return this.httpClient.get(`${environment.API_URL}/store`, {params: new HttpParams().set('filter', filter)});
    }

    public getStore(storeId): Observable<Store> {
        switch (String(storeId)) {
            case '10054':
            case  'Top Wagen':

                return Observable.of(<any>{
                    'id': 10054,
                    'name': 'Top Wagen',
                    'country': 'fr',
                    'permission': {
                        'tools': '*'
                    },
                    feed: {source: 'Shopify'},
                    order: {total: 0}
                });

            case '2866':
            case 'Sportsdepot':
                return Observable.of(<any>{
                    'id': 2866,
                    'name': 'Sportsdepot',
                    'country': 'fr',
                    'permission': {
                        'ads': '*',
                    },
                    feed: {source: 'Shopify'},
                    order: {total: 34}
                });

            case '47':
            case 'CoindugeekSG9m':
                return Observable.of(<any>{
                    'id': 47,
                    'name': 'CoindugeekSG9m',
                    'country': 'fr',
                    'permission': {
                        'affiliation': '*',
                        'buyline': '*',
                        'marketplaces': '*',
                    },
                    feed: {source: 'Shopify'},
                    order: {total: 22}
                });

        }
    }

    createStore(store: Store) {
        return this.httpClient.post(`${environment.API_URL}/store`, {store});
    }
}

