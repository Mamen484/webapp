import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PagedResponse } from 'sfl-shared/entities';
import { Observable } from 'rxjs';
import { FeedCategory } from '../entities/feed-category';

@Injectable({
    providedIn: 'root'
})
export class FeedService {

    constructor(protected httpClient: HttpClient) {
    }

    fetchCategoryCollection(feedId, {name, page, limit}: {name?: string, page?: string, limit?: string}) {
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
        return this.httpClient.get(`${environment.API_URL}/feed/${feedId}/category`, {params}) as Observable<PagedResponse<{category: FeedCategory[]}>>;
    }
}
