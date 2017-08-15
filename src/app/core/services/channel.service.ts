import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ChannelsResponse } from '../entities/channels-response';
import { Observable } from 'rxjs/Observable';
import { ChannelsRequestParams } from '../entities/channels-request-params';

@Injectable()
export class ChannelService {

    constructor(protected httpClient: HttpClient) {
    }
    getChannels(params: ChannelsRequestParams) {
        return <Observable<ChannelsResponse>>this.httpClient.get(environment.API_URL + '/channel', {
            params: new HttpParams()
                .set('page', params.page.toString())
                .set('limit', params.limit.toString())
                .set('country', params.country)
                .set('name', params.searchQuery)
                .set('type', params.type)
                .set('segment', params.segment)
                .set('status', status)
        });
    }

}
