import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { StoreChannelResponse } from '../entities/store-channel-response';
import { Statistics } from '../entities/statistics';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class StoreService {

    constructor(protected httpClient: HttpClient) {
    }

    public getAllConfiguredChannels(storeId): Observable<StoreChannelResponse> {
        return <Observable<StoreChannelResponse>>this.httpClient.get(`${environment.API_URL}/storechannel`, {
            params: new HttpParams().set('store', storeId)
        });
    }

    public getStatistics(storeId): Observable<Statistics> {
        return <Observable<Statistics>>this.httpClient.get(`${environment.API_URL}/stat/store/${storeId}`);
    }

}

