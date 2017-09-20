import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class TimelineService {

    constructor(protected httpClient: HttpClient) {
    }

    getEvents() {
        return this.httpClient.get(environment.API_URL + '/timeline',
            {
                params: new HttpParams().set('filter', 'events')
            })
    }

    getEventUpdates() {
        return this.httpClient.get(environment.API_URL + '/timeline',
            {
                params: new HttpParams().set('filter', 'updates')
            })
    }

}
