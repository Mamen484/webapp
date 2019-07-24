import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PagedResponse } from 'sfl-shared/entities';
import { ChannelPermission } from './channel-permission';

@Injectable({
    providedIn: 'root'
})
export class ChannelPermissionService {

    constructor(protected httpClient: HttpClient) {
    }

    addChannelPermission(channelId: number, accountId: number, allow: string[]) {
        return this.httpClient.post(`${environment.SFA_API}/v1/channel/permission`, {permission: {channelId, accountId, allow}});
    }

    getChannelPermissions(queryParam: { search?: string, accountName?: string, limit?: number, page?: number } = {}) {
        let params = new HttpParams();
        if (queryParam.limit) {
            params = params.set('limit', queryParam.limit.toString());
        }
        if (queryParam.page) {
            params = params.set('page', queryParam.page.toString());
        }
        if (typeof queryParam.search === 'string') {
            params = params.set('name', queryParam.search);
        }
        if (typeof queryParam.accountName === 'string') {
            params = params.set('accountName', queryParam.accountName);
        }
        return this.httpClient.get(`${environment.SFA_API}/v1/channel/permission`, {params}) as Observable<PagedResponse<{ permission: ChannelPermission[] }>>
    }
}
