import { TestBed } from '@angular/core/testing';

import { FeedService } from '../../core/services/feed.service';
import { EMPTY, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { MappingCacheService } from '../shared/mapping-cache.service';
import { ProductCategoryMappingService } from './product-category-mapping.service';

describe('ProductCategoryMappingService', () => {

    let feedService: jasmine.SpyObj<FeedService>;
    let mappingCacheService: jasmine.SpyObj<MappingCacheService>;

    beforeEach(() => {
        feedService = jasmine.createSpyObj(['mapProductCategory'])
        mappingCacheService = jasmine.createSpyObj(['getCategoryMapping', 'addCategoryMapping']);

        TestBed.configureTestingModule({
            providers: [
                {provide: FeedService, useValue: feedService},
                {provide: MappingCacheService, useValue: mappingCacheService},
            ],
        });
    });

    it('should be created', () => {
        const service: ProductCategoryMappingService = TestBed.inject(ProductCategoryMappingService);
        expect(service).toBeTruthy();
    });

    it('should call feedService.mapProductCategory on saveNewMapping call', () => {
        const service: ProductCategoryMappingService = TestBed.inject(ProductCategoryMappingService);
        feedService.mapProductCategory.and.returnValue(EMPTY);
        service.saveNewMapping(232, 22, null).subscribe();
        expect(feedService.mapProductCategory).toHaveBeenCalledWith(22, 232, null)
    });

    it('should send mapping changed event when save mapping was successful', async () => {
        const service: ProductCategoryMappingService = TestBed.inject(ProductCategoryMappingService);
        feedService.mapProductCategory.and.returnValue(of('some value'));
        const mappingChanged = service.getChanges().pipe(take(1)).toPromise();
        service.saveNewMapping(232, 22, null).subscribe();
        expect(await mappingChanged).toBe(null);
    });

    it('should send a channelCategory into mapping changed event when save mapping was successful', async () => {
        const service: ProductCategoryMappingService = TestBed.inject(ProductCategoryMappingService);
        feedService.mapProductCategory.and.returnValue(of('some value'));
        const mappingChanged = service.getChanges().pipe(take(1)).toPromise();
        service.saveNewMapping(232, 22, <any>{id: 234}).subscribe();
        expect(await mappingChanged).toEqual(<any>{id: 234});
    });

    it('should not add a category mapping to the channel cache if the channelCategory is null', () => {
        const service: ProductCategoryMappingService = TestBed.inject(ProductCategoryMappingService);
        feedService.mapProductCategory.and.returnValue(of('some value'));
        service.saveNewMapping(232, 22, null).subscribe();
        expect(mappingCacheService.addCategoryMapping).not.toHaveBeenCalled();
    });

    it('should add a category mapping to the channel cache if the channelCategory is not null', () => {
        const service: ProductCategoryMappingService = TestBed.inject(ProductCategoryMappingService);
        feedService.mapProductCategory.and.returnValue(of('some value'));
        service.saveNewMapping(232, 22, <any>{id: 234}).subscribe();
        expect(mappingCacheService.addCategoryMapping).toHaveBeenCalledWith(<any>{id: 234}, 234);
    });
});
