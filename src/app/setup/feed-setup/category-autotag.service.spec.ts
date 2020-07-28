import { TestBed } from '@angular/core/testing';

import { CategoryAutotagService } from './category-autotag.service';
import { FeedService } from '../../core/services/feed.service';

describe('CategoryAutotagService', () => {
    let service: CategoryAutotagService;
    let feedService: jasmine.SpyObj<FeedService>;

    beforeEach(() => {
        feedService = jasmine.createSpyObj(['fetchAutotagByCategory', 'matchAutotagByCategory'])
        TestBed.configureTestingModule({
            providers: [
                {provide: FeedService, useValue: feedService},
                {provide: CategoryAutotagService, useClass: CategoryAutotagService},
            ],
        });
        service = TestBed.inject(CategoryAutotagService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call feedService.fetchAutotagByCategory() on fetchAutotagList() call', () => {
        service.fetchAutotagList(12, 13, {requirement: 'required', matching: 'empty'});
        expect(feedService.fetchAutotagByCategory).toHaveBeenCalledWith(12, 13, {requirement: 'required', matching: 'empty'});
    });

    it('should call feedService.matchAutotagByCategory() on matchAutotag() call', () => {
        service.matchAutotag(12, 13, 14, '15');
        expect(feedService.matchAutotagByCategory).toHaveBeenCalledWith(12, 13, 14, '15');
    });
});
