import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http } from '@angular/http';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    protected _authHeaders: Headers;

    constructor(protected _http: Http) {
        this._authHeaders = new Headers();
        this._authHeaders.append('Accept', 'application/json');
        this._authHeaders.append('Authorization', environment.DEFAULT_AUTHORIZATION);
    }

    public fetchAggregatedInfo(): Observable<AggregatedUserInfo> {
        return this._http.get(`${environment.API_URL}/me`, {headers: this._authHeaders}).map(response => response.json());
    }

}

