import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StoreChannelResponse } from '../entities/store-channel-response';
import { Statistics } from '../entities/statistics';

@Injectable()
export class StoreService {

    protected _authHeaders: Headers;

    constructor(protected _http: Http) {
        this._authHeaders = new Headers();
        this._authHeaders.append('Accept', 'application/json');
        this._authHeaders.append('Authorization', environment.DEFAULT_AUTHORIZATION);
    }

    public getAllConfiguredChannels(storeId): Observable<StoreChannelResponse> {
        return this._http.get(`${environment.API_URL}/v1/storechannel`, {
            headers: this._authHeaders,
            params: {store: storeId}
        }).map(response => response.json());
    }

    public getStatistics(storeId): Observable<Statistics> {
        return this._http.get(`${environment.API_URL}/v1/stat/store/${storeId}`, {
            headers: this._authHeaders
        }).map(response => response.json());
    }

}

