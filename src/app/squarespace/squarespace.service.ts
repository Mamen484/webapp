import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SquarespaceStore } from './squarespace-store';

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
        const params = new HttpParams()
            .set('code', code)
            .set('state', state);
        return this.httpClient.get(`${environment.API_URL}/squarespace/store`, {params}) as Observable<SquarespaceStore>;
    }
}
