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

    listChannels(name?: string) {
        let params = new HttpParams();
        if (name) {
            params = params.set('name', name);
        }
        return this.httpClient.get(`${this.sflApi}/channel`, {params}) as Observable<PagedResponse<{channel: Channel[]}>>;
    }

}
