import { TestBed } from '@angular/core/testing';

import { BillingGroupService } from './billing-group.service';

describe('BillingGroupService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: BillingGroupService = TestBed.get(BillingGroupService);
        expect(service).toBeTruthy();
    });
});
