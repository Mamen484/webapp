import { TestBed } from '@angular/core/testing';

import { CategoryMappingService } from './category-mapping.service';
import { FeedService } from '../../../core/services/feed.service';
import { MappingCacheService } from '../mapping-cache.service';
import { EMPTY, of } from 'rxjs';
import { take } from 'rxjs/operators';

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
        const service: CategoryMappingService = TestBed.inject(CategoryMappingService);
        expect(service).toBeTruthy();
    });

    it('should call feedService.mapFeedCategory on saveNewMapping call', () => {
        const service: CategoryMappingService = TestBed.inject(CategoryMappingService);
        feedService.mapFeedCategory.and.returnValue(EMPTY);
        service.saveNewMapping(<any>{feedId: 22, catalogCategory: {id: 232}}, null).subscribe();
        expect(feedService.mapFeedCategory).toHaveBeenCalledWith(22, 232, null)
    });

    it('should send mapping changed event when save mapping was successful', async () => {
        const service: CategoryMappingService = TestBed.inject(CategoryMappingService);
        feedService.mapFeedCategory.and.returnValue(of('some value'));
        const mappingChanged = service.getChanges().pipe(take(1)).toPromise();
        service.saveNewMapping(<any>{feedId: 22, catalogCategory: {id: 232}}, null).subscribe();
        expect(await mappingChanged).toBe(null);
    });

    it('should send a channelCategory into mapping changed event when save mapping was successful', async () => {
        const service: CategoryMappingService = TestBed.inject(CategoryMappingService);
        feedService.mapFeedCategory.and.returnValue(of('some value'));
        const mappingChanged = service.getChanges().pipe(take(1)).toPromise();
        service.saveNewMapping(<any>{feedId: 22, catalogCategory: {id: 232}}, <any>{id: 234}).subscribe();
        expect(await mappingChanged).toEqual(<any>{id: 234});
    });

    it('should not add a category mapping to the channel cache if the channelCategory is null', () => {
        const service: CategoryMappingService = TestBed.inject(CategoryMappingService);
        feedService.mapFeedCategory.and.returnValue(of('some value'));
        service.saveNewMapping(<any>{feedId: 22, catalogCategory: {id: 232}}, null).subscribe();
        expect(mappingCacheService.addCategoryMapping).not.toHaveBeenCalled();
    });

    it('should add a category mapping to the channel cache if the channelCategory is not null', () => {
        const service: CategoryMappingService = TestBed.inject(CategoryMappingService);
        feedService.mapFeedCategory.and.returnValue(of('some value'));
        service.saveNewMapping(<any>{feedId: 22, catalogCategory: {id: 232}}, <any>{id: 234}).subscribe();
        expect(mappingCacheService.addCategoryMapping).toHaveBeenCalledWith(<any>{id: 234}, 234);
    });

    it('should emit a cached mapping if the mapping is in cache', async () => {
        const service: CategoryMappingService = TestBed.inject(CategoryMappingService);
        mappingCacheService.getCategoryMapping.and.returnValue(<any>{channelCategory: {id: 141}});
        service.setCurrentMapping(<any>{channelCategory: {id: 141}});
        const currentMapping = service.getCurrentMapping().pipe(take(1)).toPromise();
        expect((await currentMapping).fromCache).toBe(true);
    });

    it('should emit a not cached mapping if the mapping is not in cache', async () => {
        const service: CategoryMappingService = TestBed.inject(CategoryMappingService);
        mappingCacheService.getCategoryMapping.and.returnValue(<any>{channelCategory: {id: 141}});
        const currentMapping = service.getCurrentMapping().pipe(take(1)).toPromise();
        service.setCurrentMapping(<any>{channelCategory: {id: 253}});
        expect((await currentMapping).fromCache).toBe(false);
    });
});
