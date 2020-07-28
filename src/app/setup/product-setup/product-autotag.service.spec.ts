import { TestBed } from '@angular/core/testing';

import { ProductAutotagService } from './product-autotag.service';
import { FeedService } from '../../core/services/feed.service';

describe('ProductAutotagService', () => {
    let service: ProductAutotagService;
    let feedService: jasmine.SpyObj<FeedService>;

    beforeEach(() => {
        feedService = jasmine.createSpyObj(['fetchAutotagByProduct', 'matchAutotagByProduct'])
        TestBed.configureTestingModule({
            providers: [
                {provide: FeedService, useValue: feedService},
                {provide: ProductAutotagService, useClass: ProductAutotagService},
            ],
        });
        service = TestBed.inject(ProductAutotagService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call feedService.fetchAutotagByProduct() on fetchAutotagList() call', () => {
        service.fetchAutotagList(12, 13, {requirement: 'required', matching: 'empty'});
        expect(feedService.fetchAutotagByProduct).toHaveBeenCalledWith(12, 13, {requirement: 'required', matching: 'empty'});
    });

    it('should call feedService.matchAutotagByProduct() on matchAutotag() call', () => {
        service.matchAutotag(12, 13, 14, '15');
        expect(feedService.matchAutotagByProduct).toHaveBeenCalledWith(12, 13, 14, '15');
    });
});
