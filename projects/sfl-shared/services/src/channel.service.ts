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

    listChannels(queryParam: { permission?: string, limit?: number, page?: number, search?: string } = {}) {
        let params = new HttpParams();
        if (queryParam.permission) {
            params = params.set('permission', queryParam.permission);
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
        return this.httpClient.get(`${this.sflApi}/channel`, {params}) as Observable<PagedResponse<{ channel: Channel[] }>>;
    }

    modifyChannel(channel: Channel, id: number) {
        return this.httpClient.put(`${this.sflApi}/channel/${id}`, {channel});
    }

}
