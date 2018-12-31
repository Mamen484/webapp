import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    fetchCategoryCollection(feedId) {
        return this.httpClient.get(`${environment.API_URL}/feed/${feedId}/category`) as Observable<PagedResponse<FeedCategory[]>>;
    }
}
