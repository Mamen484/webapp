import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { StoreChannelResponse } from '../entities/store-channel-response';
import { Statistics } from '../entities/statistics';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChannelsRequestParams } from '../entities/channels-request-params';

@Injectable()
export class StoreService {

    constructor(protected httpClient: HttpClient) {
    }

    public getAllConfiguredChannels(storeId: number, params = new ChannelsRequestParams()): Observable<StoreChannelResponse> {
        return <Observable<StoreChannelResponse>>this.httpClient.get(`${environment.API_URL}/storechannel`, {
            params: new HttpParams()
                .set('store', storeId.toString())
                .set('page', params.page.toString())
                .set('limit', params.limit.toString())
                .set('country', params.country)
                .set('name', params.searchQuery)
                .set('type', params.type)
                .set('segment', params.segment)
                .set('status', status)
        });
    }

    public getStatistics(storeId): Observable<Statistics> {
        return <Observable<Statistics>>this.httpClient.get(`${environment.API_URL}/stat/store/${storeId}`);
    }

}

