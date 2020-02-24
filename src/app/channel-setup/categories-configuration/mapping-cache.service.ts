import { Injectable } from '@angular/core';
import { FeedService } from '../../core/services/feed.service';
import { Category } from '../../core/entities/category';

@Injectable({
    providedIn: 'root'
})
export class MappingCacheService {

    protected categoryMapping: Category;

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
}
