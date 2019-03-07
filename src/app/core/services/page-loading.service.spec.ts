import { TestBed } from '@angular/core/testing';

import { PageLoadingService } from './page-loading.service';

describe('PageLoadingService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: PageLoadingService = TestBed.get(PageLoadingService);
        expect(service).toBeTruthy();
    });
});
