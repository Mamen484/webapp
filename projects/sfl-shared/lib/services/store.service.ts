import { map, mergeMap, publishReplay } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { ConnectableObservable, Observable } from 'rxjs';
import {
    ChannelsRequestParams,
    ChannelsResponse,
    PagedResponse,
    SFL_API,
    Statistics,
    Store as UserStore,
    StoreChannel,
    StoreChannelResponse,
    StoreCharge
} from 'sfl-shared/entities';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

/**
 * A service to work with a store API.
 */
@Injectable({
    providedIn: 'root'
})
export class StoreService {

    charge$: ConnectableObservable<StoreCharge>;

    constructor(private httpClient: HttpClient,
                @Inject(SFL_API) private sflApi,
                private appStore: Store<{ currentStore: UserStore }>) {
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
            .set('status', params.status)
            .set('embed', 'stats');

        if (foreignChannels) {
            return <any>this.httpClient.get(`${this.sflApi}/channel`, {params: httpParams}).pipe(
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
        return this.httpClient.get(`${this.sflApi}/store/${storeId}/channel`, {params: httpParams.set('sortBy', 'installed:desc,channelName:asc')}).pipe(
            map((data: StoreChannelResponse) =>
                // we use 'channel' property to have the same structure for results in the store country and outside it
                Object.assign({}, data, {_embedded: {channel: data._embedded.storeChannel}})));
    }

    getInstalledChannels(params = new ChannelsRequestParams()) {
        let httpParams = new HttpParams()
            .set('page', params.page.toString())
            .set('limit', params.limit.toString())
            .set('country', params.country)
            .set('name', params.searchQuery)
            .set('type', params.type)
            .set('segment', params.segment)
            .set('status', 'installed')
            .set('embed', 'stats');

        return this.appStore.select('currentStore').pipe(
            mergeMap(store => this.httpClient.get(`${this.sflApi}/store/${store.id}/channel`, {params: httpParams.set('sortBy', 'installed:desc,channelName:asc')}))
        );
    }

    public fetchStatistics(): Observable<Statistics> {
        return this.appStore.select('currentStore').pipe(
            mergeMap(store => <Observable<Statistics>>this.httpClient.get(`${this.sflApi}/stat/store/${store.id}`))
        );
    }

    public getStatistics(storeId): Observable<Statistics> {
        return <Observable<Statistics>>this.httpClient.get(`${this.sflApi}/stat/store/${storeId}`);
    }

    public getStoreCharge(storeId): Observable<StoreCharge> {
        if (!this.charge$) {
            this.charge$ = this.httpClient.get(`${this.sflApi}/store/${storeId}/charge`)
                .pipe(publishReplay()) as ConnectableObservable<StoreCharge>;
            this.charge$.connect();
        }
        return this.charge$;
    }

    public fetchAvailableStores(filter = '') {
        return <Observable<any>>this.httpClient.get(`${this.sflApi}/store`, {params: new HttpParams().set('name', filter)});
    }

    public getStore(storeId): Observable<UserStore> {
        return <Observable<UserStore>>this.httpClient.get(`${this.sflApi}/store/${storeId}`);
    }

    public createStore(store: UserStore) {
        return this.httpClient.post(`${this.sflApi}/store`, {store}) as Observable<UserStore>;
    }
}

