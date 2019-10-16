import { TestBed } from '@angular/core/testing';

import { ReferenceService } from './reference.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('ReferenceService', () => {
    beforeEach(() => TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }));

    it('should be created', () => {
        const service: ReferenceService = TestBed.get(ReferenceService);
        expect(service).toBeTruthy();
    });

    it('should call a valid resource on getFields()', () => {
        const service: ReferenceService = TestBed.get(ReferenceService);
        const httpMock: HttpTestingController = TestBed.get(HttpTestingController);

        service.getFields().subscribe();
        const req = httpMock.expectOne(`${environment.apiLink}/reference/field`);
        expect(req.request.method).toBe('GET');
    });
});
