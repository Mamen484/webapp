import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Channel, PagedResponse, SFL_API } from 'sfl-shared/entities';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChannelService {
    constructor(protected httpClient: HttpClient, @Inject(SFL_API) protected sflApi) {
    }

    createChannel(channel: Channel) {
        return this.httpClient.post(`${this.sflApi}/channel`, {channel}) as Observable<Channel>;
    }

    listChannels(queryParam: { state?: string, permission?: string, limit?: number, page?: number, search?: string, country?: string, segment?: string, type?: string } = {}) {
        let params = new HttpParams();
        if (queryParam.permission) {
            params = params.set('permission', queryParam.permission);
        }
        if (queryParam.state) {
            params = params.set('state', queryParam.state);
        }
        if (queryParam.limit) {
            params = params.set('limit', queryParam.limit.toString());
        }
        if (queryParam.page) {
            params = params.set('page', queryParam.page.toString());
        }
        if (typeof queryParam.search === 'string') {
            params = params.set('name', queryParam.search);
        }
        if (queryParam.country) {
            params = params.set('country', queryParam.country.toString());
        }
        if (queryParam.segment) {
            params = params.set('segment', queryParam.segment.toString());
        }

        if (queryParam.type) {
            params = params.set('type', queryParam.type.toString());
        }
        return this.httpClient.get(`${this.sflApi}/channel`, {params}) as Observable<PagedResponse<{ channel: Channel[] }>>;
    }

    modifyChannel(channel: Channel, id: number) {
        return this.httpClient.put(`${this.sflApi}/channel/${id}`, {channel});
    }

    fetchChannel(channelId) {
        return this.httpClient.get(`${this.sflApi}/channel/${channelId}`) as Observable<Channel>;
    }

    activate(channelId) {
        return this.httpClient.put(`${this.sflApi}/channel/${channelId}/activate`, {});
    }

    deactivate(channelId) {
        return this.httpClient.put(`${this.sflApi}/channel/${channelId}/deactivate`, {});
    }

}
