import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PagedResponse } from 'sfl-shared/entities';
import { Observable } from 'rxjs';
import { FeedCategory } from '../entities/feed-category';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { flatMap, take } from 'rxjs/operators';
import { Feed } from '../entities/feed';
import { CategoryMapping } from '../../channel-setup/category-mapping';

@Injectable({
    providedIn: 'root'
})
export class FeedService {

    constructor(protected httpClient: HttpClient, protected appStore: Store<AppState>) {
    }

    fetchCategoryCollection(feedId, {name, page, limit, mapping}: { name?: string, page?: string, limit?: string, mapping?: CategoryMapping }) {
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

        if (mapping) {
            params = params.set('mapping', mapping);
        }
        return this.httpClient.get(`${environment.API_URL}/feed/${feedId}/category`, {params}) as Observable<PagedResponse<{ category: FeedCategory[] }>>;
    }

    fetchFeedCollection(channelId: number) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap((store) =>
                this.httpClient.get(`${environment.API_URL}/feed`, {
                    params: new HttpParams()
                        .set('catalogId', String(store.id))
                        .set('channelId', String(channelId))
                        .set('country', store.country)
                })),
        ) as Observable<PagedResponse<{feed: Feed[]}>>;
    }
}
