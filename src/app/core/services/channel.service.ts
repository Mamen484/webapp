import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChannelsResponse } from '../entities/channels-response';
import { Observable } from 'rxjs/Observable';
import { GetAllChannelsParams } from '../entities/get-all-channels-params';

@Injectable()
export class ChannelService {

    constructor(protected httpClient: HttpClient) {
    }
    getChannels({page = 1, limit = 6, searchQuery, country, type, segment, status}: GetAllChannelsParams = {}) {
        return <Observable<ChannelsResponse>>this.httpClient.get(`${environment.API_URL}/channel`, {
            params: new HttpParams()
                .set('page', page.toString())
                .set('limit', limit.toString())
                .set('country', country)
                .set('name', searchQuery)
                .set('type', type)
                .set('segment', segment)
                .set('status', status)
        });
    }

}
