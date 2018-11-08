import { TestBed } from '@angular/core/testing';

import { BillingService } from './billing.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BillingService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    }));

    it('should be created', () => {
        const service: BillingService = TestBed.get(BillingService);
        expect(service).toBeTruthy();
    });
});
