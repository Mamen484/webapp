import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SquarespaceStore } from './squarespace-store';
import { CustomParamsEncoder } from './custom-params-encoder';

@Injectable({
    providedIn: 'root'
})
export class SquarespaceService {

    constructor(protected httpClient: HttpClient) {
    }

    auth() {
        return this.httpClient.get(`${environment.API_URL}/squarespace/auth`) as Observable<{ authorizeUrl: string }>;
    }

    getStore(code, state) {
        const params = new HttpParams({encoder: new CustomParamsEncoder()})
            .set('code', code)
            .set('state', state);
        return this.httpClient.get(`${environment.API_URL}/squarespace/store`, {params}) as Observable<SquarespaceStore>;
    }
}
