import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChannelPermissionService {

    constructor(protected httpClient: HttpClient) {
    }

    addChannelPermission(channelId: number, accountId: number, allow: string[]) {
        return this.httpClient.post(`${environment.SFA_API}/channel/permission`, {permission: {channelId, accountId, allow}});
    }
}
