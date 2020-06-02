import { Injectable } from '@angular/core';
import { FeedService } from '../../core/services/feed.service';
import { Category } from '../../core/entities/category';

@Injectable({
    providedIn: 'root'
})
export class MappingCacheService {

    protected categoryMapping: {channelCategory: Category, catalogCategoryId: number};

    constructor(protected feedService: FeedService) {
    }

    addCategoryMapping(channelCategory: Category, catalogCategoryId: number) {
        this.categoryMapping = {channelCategory, catalogCategoryId};
    }

    hasCategoryMapping() {
        return Boolean(this.categoryMapping);
    }

    getCategoryMapping() {
        return this.categoryMapping;
    }
}
