import {TestBed} from '@angular/core/testing';

import {MappingCacheService} from './mapping-cache.service';
import {FeedService} from '../../core/services/feed.service';

describe('MappingCacheService', () => {
    let feedService: jasmine.SpyObj<FeedService>;
    let service: MappingCacheService;
    beforeEach(() => {
        feedService = jasmine.createSpyObj('FeedService spy', ['fetchAutotagByCategory']);
        TestBed.configureTestingModule({
            providers: [
                {provide: FeedService, useValue: feedService},
            ],
        });
        service = TestBed.get(MappingCacheService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return saved category mapping cache on getCategoryMapping() call', () => {
        service.addCategoryMapping({id: 14, name: 'Name', channelId: 22}, 33);
        expect(service.getCategoryMapping()).toEqual({channelCategory: {id: 14, name: 'Name', channelId: 22}, catalogCategoryId: 33});
    });

    it('should return true on hasCategoryMapping() call if category is mapped', () => {
        service.addCategoryMapping({id: 14, name: 'Name', channelId: 22}, 33);
        expect(service.hasCategoryMapping()).toBe(true);
    });

    it('should return false on hasCategoryMapping() call if category is not mapped', () => {
        expect(service.hasCategoryMapping()).toBe(false);
    });
});
