import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CustomParamsEncoder } from './custom-params-encoder';
import { SquarespaceStore } from 'sfl-shared/entities';

@Injectable({
    providedIn: 'root'
})
export class SquarespaceService {

    constructor(protected httpClient: HttpClient) {
    }

    auth() {
        return this.httpClient.get(`${environment.API_URL}/squarespace/auth`) as Observable<{ authorizeUrl: string }>;
    }

    getStore(code) {
        const params = new HttpParams({encoder: new CustomParamsEncoder()})
            .set('code', code);
        return this.httpClient.get(`${environment.API_URL}/squarespace/store`, {params}) as Observable<SquarespaceStore>;
    }
}
