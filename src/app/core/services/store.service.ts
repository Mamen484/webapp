import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Statistics } from '../entities/statistics';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StoreChannelResponse } from '../entities/store-channel-response';
import { ChannelsResponse } from '../entities/channels-response';
import { StoreChannel } from '../entities/store-channel';
import { PagedResponse } from '../entities/paged-response';
import { ChannelsRequestParams } from '../entities/channels-request-params';
import { StoreCharge } from '../entities/store-charge';
import { Store } from '../entities/store';

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
            return <any>this.httpClient.get(`${environment.API_URL}/channel`, {params: httpParams}).pipe(
                map((data: ChannelsResponse) =>
                    // we need this to have the same data when the user selects a store country, and another country
                    Object.assign({}, data, {
                        _embedded: {
                            channel: data._embedded.channel.map(channel => ({
                                installed: false,
                                _embedded: {channel: channel}
                            }))
                        }
                    })))
                ;
        }
        return this.httpClient.get(`${environment.API_URL}/store/${storeId}/channel`, {params: httpParams}).pipe(
            map((data: StoreChannelResponse) =>
                // we use 'channel' property to have the same structure for results in the store country and outside it
                Object.assign({}, data, {_embedded: {channel: data._embedded.storeChannel}})));
    }

    public getStatistics(storeId): Observable<Statistics> {
        return <Observable<Statistics>>this.httpClient.get(`${environment.API_URL}/stat/store/${storeId}`);
    }

    public getStoreCharge(storeId): Observable<{ charge: StoreCharge }> {
        return <Observable<{ charge: StoreCharge }>>this.httpClient.get(`${environment.API_URL}/store/${storeId}/charge`);
    }

    public fetchAvailableStores(filter: string) {
        return <Observable<any>>this.httpClient.get(`${environment.API_URL}/store`, {params: new HttpParams().set('name', filter)});
    }

    public getStore(storeId): Observable<Store> {
        return <Observable<Store>>this.httpClient.get(`${environment.API_URL}/store/${storeId}`);
    }

    public createStore(store: Store) {
        return this.httpClient.post(`${environment.API_URL}/store`, {store});
    }
}

