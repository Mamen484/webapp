import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SquarespaceService {

    constructor(protected httpClient: HttpClient) {
    }

    auth(websiteId) {
        return this.httpClient.get(`${environment.API_URL}/squarespace/auth/${websiteId}`) as Observable<{authorizeUrl: string}>;
    }
}
