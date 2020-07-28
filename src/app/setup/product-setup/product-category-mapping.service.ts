import { Injectable } from '@angular/core';
import { CategoryMappingService } from '../shared/category-mapping.service';
import { FeedService } from '../../core/services/feed.service';
import { Category } from '../../core/entities/category';
import { tap } from 'rxjs/operators';
import { MappingCacheService } from '../shared/mapping-cache.service';

@Injectable({
    providedIn: 'root',
})
export class ProductCategoryMappingService extends CategoryMappingService {
    constructor(protected feedService: FeedService, protected mappingCacheService: MappingCacheService) {
        super();
    }


    saveNewMapping(itemId: number, feedId: number, channelCategory: Category) {
        return this.feedService.mapProductCategory(
            feedId,
            itemId,
            channelCategory
                // modify mapping
                ? channelCategory.id
                // remove mapping
                : null
        ).pipe(tap(() => {
            this.mappingChanged$.next(channelCategory);
            if (channelCategory) {
                this.mappingCacheService.addCategoryMapping(channelCategory, channelCategory.id);
            }
        }))
    }
}
