import { BehaviorSubject, Subject } from 'rxjs';
import { Category } from '../../core/entities/category';
import { MappingCacheService } from './mapping-cache.service';

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
    catalogCategoryId: number,
    feedId: number,
    channelCategory: Category
}

export abstract class CategoryMappingService {

    protected mappingChanged$ = new Subject<Category>();
    protected currentMapping$ = new BehaviorSubject<{
        fromCache: boolean,
        mapping: Mapping,
    }>({fromCache: false, mapping: {catalogCategoryId: null, feedId: null, channelCategory: null}});
    protected abstract mappingCacheService: MappingCacheService;

    abstract saveNewMapping(itemId: number, feedId: number, channelCategory: Category);

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
