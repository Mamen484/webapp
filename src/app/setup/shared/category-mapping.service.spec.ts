import { TestBed } from '@angular/core/testing';

import { CategoryMappingService } from './category-mapping.service';
import { FeedService } from '../../core/services/feed.service';
import { MappingCacheService } from './mapping-cache.service';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Category } from '../../core/entities/category';

@Injectable({providedIn: 'root'})
class CategoryMappingServiceSpec extends CategoryMappingService {
    constructor(protected mappingCacheService: MappingCacheService) {
        super();
    }

    saveNewMapping(itemId: number, feedId: number, channelCategory: Category) {
    }

}

describe('CategoryMappingService', () => {

    let feedService: jasmine.SpyObj<FeedService>;
    let mappingCacheService: jasmine.SpyObj<MappingCacheService>;

    beforeEach(() => {
        feedService = jasmine.createSpyObj(['mapFeedCategory'])
        mappingCacheService = jasmine.createSpyObj(['getCategoryMapping', 'addCategoryMapping']);

        TestBed.configureTestingModule({
            providers: [
                {provide: FeedService, useValue: feedService},
                {provide: MappingCacheService, useValue: mappingCacheService},
            ],
        });
    });

    it('should be created', () => {
        const service: CategoryMappingService = TestBed.inject(CategoryMappingServiceSpec);
        expect(service).toBeTruthy();
    });

    it('should emit a cached mapping if the mapping is in cache', async () => {
        const service: CategoryMappingService = TestBed.inject(CategoryMappingServiceSpec);
        mappingCacheService.getCategoryMapping.and.returnValue(<any>{channelCategory: {id: 141}});
        service.setCurrentMapping(<any>{channelCategory: {id: 141}});
        const currentMapping = service.getCurrentMapping().pipe(take(1)).toPromise();
        expect((await currentMapping).fromCache).toBe(true);
    });

    it('should emit a not cached mapping if the mapping is not in cache', async () => {
        const service: CategoryMappingService = TestBed.inject(CategoryMappingServiceSpec);
        mappingCacheService.getCategoryMapping.and.returnValue(<any>{channelCategory: {id: 141}});
        const currentMapping = service.getCurrentMapping().pipe(take(1)).toPromise();
        service.setCurrentMapping(<any>{channelCategory: {id: 253}});
        expect((await currentMapping).fromCache).toBe(false);
    });
});
