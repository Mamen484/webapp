import { TestBed } from '@angular/core/testing';

import { MappingCacheService } from './mapping-cache.service';
import { FeedService } from '../../core/services/feed.service';
import { EMPTY, of } from 'rxjs';

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
        service.addCategoryMapping({id: 14, name: 'Name', channelId: 22});
        expect(service.getCategoryMapping()).toEqual({id: 14, name: 'Name', channelId: 22});
    });

    it('should return false on hasAutotagMapping() when autotag mapping for this autotag was NOT saved', () => {
        service.addAutotagMapping(1, 2, 1);
        expect(service.hasAutotagMapping(3)).toEqual(false);
    });

    it('should return true on hasAutotagMapping() when autotag mapping for this autotag was saved', () => {
        service.addAutotagMapping(1, 2, 1);
        expect(service.hasAutotagMapping(1)).toEqual(true);
    });

    it('should return true on hasAutotagMapping() for all saved channelCategoryId`s', () => {
        service.addAutotagMapping(1, 2, 1);
        service.addAutotagMapping(2, 2, 1);
        service.addAutotagMapping(225, 2, 1);
        expect(service.hasAutotagMapping(1)).toEqual(true);
        expect(service.hasAutotagMapping(2)).toEqual(true);
        expect(service.hasAutotagMapping(225)).toEqual(true);
    });

    it('shouldn`t call API for hasAutotagMapping()', () => {
        service.hasAutotagMapping(1);
        expect(feedService.fetchAutotagByCategory).not.toHaveBeenCalled();
    });

    it('should call feedService.fetchAutotagByCategory to get autotags list', () => {
        feedService.fetchAutotagByCategory.and.returnValue(EMPTY);
        service.addAutotagMapping(4, 2, 1);
        service.getAutotagMapping(4);
        expect(feedService.fetchAutotagByCategory).toHaveBeenCalledWith(1, 2);
    });

    it('should return autotags from getAutotagMapping() call', async () => {
        feedService.fetchAutotagByCategory.and.returnValue(of(<any>{
            _embedded: {
                autotag: [
                    {id: 1}, {id: 2}
                ]
            }
        }));
        service.addAutotagMapping(4, 2, 1);
        const autotags = await service.getAutotagMapping(4).toPromise();
        expect(autotags).toEqual(<any>[{id: 1}, {id: 2}]);
    });
});
