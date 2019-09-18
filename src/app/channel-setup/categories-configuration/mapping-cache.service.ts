import { Injectable } from '@angular/core';
import { FeedService } from '../../core/services/feed.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Autotag } from '../autotag';
import { Category } from '../../core/entities/category';

@Injectable({
    providedIn: 'root'
})
export class MappingCacheService {

    protected categoryMapping: Category;
    protected autotagMapping = new Map();

    constructor(protected feedService: FeedService) {
    }

    addCategoryMapping(channelCategory: Category) {
        this.categoryMapping = channelCategory;
    }

    hasCategoryMapping() {
        return Boolean(this.categoryMapping);
    }

    getCategoryMapping(): Category {
        return this.categoryMapping;
    }

    addAutotagMapping(channelCategoryId, catalogCategoryId, feedId) {
        this.autotagMapping.set(channelCategoryId, [catalogCategoryId, feedId]);
    }

    hasAutotagMapping(channelCategoryId) {
        return this.autotagMapping.has(channelCategoryId);
    }

    getAutotagMapping(channelCategoryId): Observable<Autotag[]> {
        if (this.autotagMapping.has(channelCategoryId)) {
            const [catalogCategoryId, feedId] = this.autotagMapping.get(channelCategoryId);
            return this.feedService.fetchAutotagByCategory(feedId, catalogCategoryId).pipe(
                map(response => response._embedded.autotag),
            );
        }
        return of([]);
    }


}
