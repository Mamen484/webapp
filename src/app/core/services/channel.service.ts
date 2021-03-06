import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Channel, PagedResponse } from 'sfl-shared/entities';
import { Category } from '../entities/category';
import { Observable } from 'rxjs';
import { ChannelConstraint } from '../entities/channel-constraint';

const maxApiLimit = '200';

@Injectable({
    providedIn: 'root'
})
export class ChannelService {

    constructor(protected httpClient: HttpClient) {
    }

    getChannelCategories(channelId: number, {name, page, limit, country}: { name?: string, page?: string, limit?: string, country?: string }) {
        let params = new HttpParams();
        if (name) {
            params = params.set('name', name);
        }
        if (page) {
            params = params.set('page', page);
        }

        if (limit) {
            params = params.set('limit', limit);
        }

        if (country) {
            params = params.set('country', country);
        }
        return this.httpClient.get(
            `${environment.API_URL}/channel/${String(channelId)}/category`,
            {params}
        ) as Observable<PagedResponse<{ category: Category[] }>>;
    }

    getChannel(channelId) {
        return this.httpClient.get(`${environment.API_URL}/channel/${channelId}`) as Observable<Channel>;
    }

    fetchChannelConstraintCollection(taxonomyId: number, groupId: number, label?: string, options?: { page: string }) {
        let params = new HttpParams().set('groupId', groupId.toString()).set('limit', maxApiLimit);
        if (label) {
            params = params.set('label', label);
        }
        if (options?.page) {
            params = params.set('page', options.page);
        }
        return this.httpClient.get(
            `${environment.API_URL}/channel/taxonomy/${taxonomyId}/constraint`,
            {params}
        ) as Observable<PagedResponse<{ constraint: ChannelConstraint[] }>>;
    }
}
