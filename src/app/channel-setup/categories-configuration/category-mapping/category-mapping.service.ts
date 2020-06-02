import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Category } from '../../../core/entities/category';
import { FeedService } from '../../../core/services/feed.service';
import { FeedCategory } from '../../../core/entities/feed-category';
import { tap } from 'rxjs/operators';
import { MappingCacheService } from '../mapping-cache.service';

/**
 @startuml
 actor User
 User -> FeedCategoriesList: choose a category
 FeedCategoriesList -> CategoryMappingService: setCurrentMapping()
 CategoryMappingService -> CategoryMappingComponent: emit currentMapping value
 User <-- CategoryMappingComponent: display a current mapping
 User -> CategoryMappingComponent: save new mapping
 CategoryMappingComponent -> CategoryMappingService: saveNewMapping()
 CategoryMappingService -> FeedService: send the save mapping request
 CategoryMappingService <-- FeedService: return success respone
 CategoryMappingService -> CategoryMappingCacheService: save the mapping cache
 CategoryMappingService -> FeedCategoriesList: emit mappingChanged event
 FeedCategoriesList -> User: show the updated categories list
 FeedCategoriesList -> CategoryMappingService: setCurrentMapping()
 CategoryMappingService -> CategoryMappingComponent: emit currentMapping value
 User <-- CategoryMappingComponent: display a current mapping
 @enduml
 */

export interface Mapping {
    catalogCategory: FeedCategory,
    channelCategory: Category
}

@Injectable({
    providedIn: 'root'
})
export class CategoryMappingService {

    protected mappingChanged$ = new Subject<Category>();
    protected currentMapping$ = new BehaviorSubject<{
        fromCache: boolean,
        mapping: Mapping,
    }>({fromCache: false, mapping: {catalogCategory: null, channelCategory: null}});

    constructor(protected feedService: FeedService, protected mappingCacheService: MappingCacheService) {
    }


    saveNewMapping(catalogCategory: FeedCategory, channelCategory: Category) {
        return this.feedService.mapFeedCategory(
            catalogCategory.feedId,
            catalogCategory.catalogCategory.id,
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

    setCurrentMapping(mapping: Mapping) {
        const cachedMapping = this.mappingCacheService.getCategoryMapping();
        const fromCache = Boolean(cachedMapping && cachedMapping.channelCategory.id === mapping.channelCategory?.id);
        this.currentMapping$.next({mapping, fromCache});
    }

    getCurrentMapping() {
        return this.currentMapping$.asObservable();
    }

    getChanges() {
        return this.mappingChanged$.asObservable();
    }
}
