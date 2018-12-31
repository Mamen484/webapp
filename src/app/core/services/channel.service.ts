import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PagedResponse } from 'sfl-shared/entities';
import { Category } from '../entities/category';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChannelService {

    constructor(protected httpClient: HttpClient) {
    }

    getChannelCategories(channelId: number, {name, page, limit}: {name?: string, page?: string, limit?: string}) {
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
        return this.httpClient.get(
            `${environment.API_URL}/channel/${String(channelId)}/category`,
            {params}
        ) as Observable<PagedResponse<{ category: Category[] }>>;
    }
}
