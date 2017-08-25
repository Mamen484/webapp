import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InternationalAccountService } from './international-account.service';

describe('InternationalAccountService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [InternationalAccountService]
        });
    });

    it('should be created', inject([InternationalAccountService], (service: InternationalAccountService) => {
        expect(service).toBeTruthy();
    }));
});
