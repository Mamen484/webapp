import { TestBed } from '@angular/core/testing';

import { CategoryMappingService } from './category-mapping.service';

describe('CategoryMappingService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: CategoryMappingService = TestBed.get(CategoryMappingService);
        expect(service).toBeTruthy();
    });
});
