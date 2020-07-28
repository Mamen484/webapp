import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PagedResponse } from 'sfl-shared/entities';
import { ConnectableObservable, Observable, of, zip } from 'rxjs';
import { FeedCategory } from '../entities/feed-category';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { flatMap, map, publishReplay, take } from 'rxjs/operators';
import { Feed } from '../entities/feed';
import { ConfigurationState } from '../../setup/configuration-state';
import { Autotag } from '../../setup/autotag';
import { MappingCollection } from '../../setup/mapping-collection';
import { FeedCategoryMapping } from '../../setup/feed-category-mapping';
import { Product } from '../../setup/product-setup/entities/product';

const MAX_API_LIMIT = '200';

@Injectable({
    providedIn: 'root'
})
export class FeedService {

    feedCache = new Map<number, Observable<PagedResponse<{ feed: Feed[] }>>>();
    protected mappingCache = new Map<number, Observable<MappingCollection>>();

    constructor(protected httpClient: HttpClient, protected appStore: Store<AppState>) {
    }

    fetchCategoryCollection(feedId, {name, page, limit, state}: { name?: string, page?: string, limit?: string, state?: ConfigurationState }) {
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

        if (state) {
            params = params.set('state', state);
        }
        return this.httpClient.get(
            `${environment.API_URL}/feed/${feedId}/category`, {params}
        ) as Observable<PagedResponse<{ category: FeedCategory[] }>>;
    }

    fetchProductCollection(feedId, {name, page, limit, state}: { name?: string, page?: string, limit?: string, state?: ConfigurationState }) {
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

        if (state) {
            params = params.set('state', state);
        }
        return this.httpClient.get(
            `${environment.API_URL}/feed/${feedId}/product`, {params}
        ) as Observable<PagedResponse<{ product: Product[] }>>;
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

    mapProductCategory(feedId, catalogProductId: number, channelCategoryId: number) {
        return this.httpClient.put(
            `${environment.API_URL}/feed/${feedId}/mapping/product/${catalogProductId}`,
            {mapping: {channelCategoryId}}
        );
    }

    copyCategoryAttributes(feedId: number, sourceCategoryId: number, targetCategoryId: number) {
        return this.copyCategoryAttributesForPage(feedId, sourceCategoryId, targetCategoryId, 1).pipe(
            flatMap((response) => {
                if (response.pages > 1) {
                    const requests = [];
                    for (let i = 2; i <= response.pages; i++) {
                        requests.push(this.copyCategoryAttributesForPage(feedId, sourceCategoryId, targetCategoryId, i));
                    }
                    return zip(...requests);
                }
                return of(response);
            }));
    }

    create(channelId) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap((store) => this.httpClient.post(`${environment.API_URL}/feed`, {
                feed: {catalogId: store.id, channelId, country: store.country},
            }))
        ) as Observable<Feed>;
    }

    fetchAutotagByCategory(feedId, catalogCategoryId, {requirement, matching, page}: { requirement?: 'required' | 'optional', matching?: 'matched' | 'empty', page?: number } = {}) {
        let params = new HttpParams().set('limit', MAX_API_LIMIT);
        if (requirement) {
            params = params.set('channelAttributeRequirement', requirement);
        }
        if (matching) {
            params = params.set('matching', matching);
        }
        if (page) {
            params = params.set('page', page.toString());
        }
        return this.httpClient.get(
            `${environment.API_URL}/feed/${feedId}/autotag/category/${catalogCategoryId}`, {params}
        ) as Observable<PagedResponse<{ autotag: Autotag[] }>>;
    }

    fetchAutotagByProduct(feedId, catalogCategoryId, {requirement, matching, page}: { requirement?: 'required' | 'optional', matching?: 'matched' | 'empty', page?: number } = {}) {
        let params = new HttpParams().set('limit', MAX_API_LIMIT);
        if (requirement) {
            params = params.set('channelAttributeRequirement', requirement);
        }
        if (matching) {
            params = params.set('matching', matching);
        }
        if (page) {
            params = params.set('page', page.toString());
        }
        return this.httpClient.get(
            `${environment.API_URL}/feed/${feedId}/autotag/product/${catalogCategoryId}`, {params}
        ) as Observable<PagedResponse<{ autotag: Autotag[] }>>;
    }

    matchAutotagByCategory(feedId, catalogCategoryId, channelAttributeId, value) {
        return this.httpClient.put(
            `${environment.API_URL}/feed/${feedId}/autotag/category/${catalogCategoryId}/attribute/${channelAttributeId}`,
            {autotag: {value}}
        );
    }

    matchAutotagByProduct(feedId, catalogProductId, channelAttributeId, value) {
        return this.httpClient.put(
            `${environment.API_URL}/feed/${feedId}/autotag/product/${catalogProductId}/attribute/${channelAttributeId}`,
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

    fetchFeed(feedId) {
        return this.httpClient.get(`${environment.API_URL}/feed/${feedId}`) as Observable<Feed>;
    }

    protected copyCategoryAttributesForPage(feedId, sourceCategoryId, targetCategoryId, page) {
        return this.fetchAutotagByCategory(feedId, sourceCategoryId, {page}).pipe(
            flatMap((response) => this.saveAttributes(feedId, targetCategoryId, response._embedded.autotag).pipe(
                map(() => response)
            ))
        );

    }

    protected saveAttributes(feedId: number, categoryId: number, autotags: Autotag[]) {
        return zip(...autotags.map(autotag => this.matchAutotagByCategory(
            feedId,
            categoryId,
            autotag.channelAttributeId,
            autotag.value))
        );
    }


}
