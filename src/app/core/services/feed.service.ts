import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PagedResponse } from 'sfl-shared/entities';
import { ConnectableObservable, Observable } from 'rxjs';
import { FeedCategory } from '../entities/feed-category';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { flatMap, publishReplay, take } from 'rxjs/operators';
import { Feed } from '../entities/feed';
import { CategoryMapping } from '../../channel-setup/category-mapping';
import { Autotag } from '../../channel-setup/autotag';
import { MappingCollection } from '../../channel-setup/mapping-collection';
import { FeedCategoryMapping } from '../../channel-setup/feed-category-mapping';

const MAX_API_LIMIT = '200';

@Injectable({
    providedIn: 'root'
})
export class FeedService {

    feedCache = new Map<number, Observable<PagedResponse<{ feed: Feed[] }>>>();
    protected mappingCache = new Map<number, Observable<MappingCollection>>();

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
        return this.httpClient.get(
            `${environment.API_URL}/feed/${feedId}/category`, {params}
        ) as Observable<PagedResponse<{ category: FeedCategory[] }>>;
    }

    fetchFeedCollection(channelId: number, forceFetch = false) {
        if (!this.feedCache.has(channelId) || forceFetch) {
            const observable = this.appStore.select('currentStore').pipe(
                take(1),
                flatMap((store) =>
                    this.httpClient.get(`${environment.API_URL}/feed`, {
                        params: new HttpParams()
                            .set('catalogId', String(store.id))
                            .set('channelId', String(channelId))
                            .set('country', store.country)
                    })),
                publishReplay()
            ) as ConnectableObservable<PagedResponse<{ feed: Feed[] }>>;
            observable.connect();
            this.feedCache.set(channelId, observable);
        }
        return this.feedCache.get(channelId);
    }

    mapFeedCategory(feedId, catalogCategoryId: number, channelCategoryId: number) {
        return this.httpClient.put(
            `${environment.API_URL}/feed/${feedId}/mapping/category/${catalogCategoryId}`,
            {mapping: {channelCategoryId}}
        );
    }

    create(channelId) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap((store) => this.httpClient.post(`${environment.API_URL}/feed`, {
                feed: {catalogId: store.id, channelId, country: store.country},
            }))
        );
    }

    fetchAutotagByCategory(feedId, catalogCategoryId) {
        return this.httpClient.get(
            `${environment.API_URL}/feed/${feedId}/autotag/category/${catalogCategoryId}`,
            {params: new HttpParams().set('limit', MAX_API_LIMIT)}
        ) as Observable<PagedResponse<{ autotag: Autotag[] }>>;
    }

    matchAutotagByCategory(feedId, catalogCategoryId, channelAttributeId, value) {
        return this.httpClient.put(
            `${environment.API_URL}/feed/${feedId}/autotag/category/${catalogCategoryId}/attribute/${channelAttributeId}`,
            {autotag: {value}}
        );
    }

    fetchMappingCollection() {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => {
                    const catalogId = store.id;
                    if (!this.mappingCache.has(catalogId)) {
                        const observable = this.httpClient.get(`${environment.API_URL}/catalog/${catalogId}/mapping`)
                            .pipe(publishReplay()) as ConnectableObservable<MappingCollection>;
                        observable.connect();
                        this.mappingCache.set(catalogId, observable);
                    }
                    return this.mappingCache.get(catalogId);
                }
            ));
    }

    fetchCategoryMapping(feedId, catalogCategoryId) {
        return this.httpClient.get(`${environment.API_URL}/feed/${feedId}/mapping/category/${catalogCategoryId}`) as Observable<FeedCategoryMapping>;
    }
}
