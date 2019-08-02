import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Channel, SFL_API } from 'sfl-shared/entities';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChannelService {
    constructor(protected httpClient: HttpClient, @Inject(SFL_API) protected sflApi) {
    }

    createChannel(channel: Channel) {
        return this.httpClient.post(`${this.sflApi}/channel`, {channel}) as Observable<Channel>;
    }

}
