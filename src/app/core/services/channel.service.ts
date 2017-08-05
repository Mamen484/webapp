import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChannelsResponse } from '../entities/channels-response';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChannelService {

    constructor(protected httpClient: HttpClient) {
    }

    getChannels(searchQuery?: string, country?: string, type?: string, segment?: string, status?: string) {
        return <Observable<ChannelsResponse>>this.httpClient.get(`${environment.API_URL}/channel`, {
            params: new HttpParams()
                .set('country', country)
                .set('name', searchQuery)
                .set('type', type)
                .set('segment', segment)
                .set('status', status)
        });
    }

}
