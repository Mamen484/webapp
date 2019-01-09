import { TestBed } from '@angular/core/testing';

import { BillingStoreService } from './billing-store.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('BillingService', () => {

    let service: BillingStoreService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        service = TestBed.get(BillingStoreService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should GET /store on fetchStoreCollection()', () => {
        service.fetchStoreCollection({limit: 22, page: 15}).subscribe();
        let req = httpMock.expectOne(`${environment.SFA_BILLING_API}/store?limit=22&page=15`);
        expect(req.request.method).toBe('GET');
    });

    it('should GET /store/id on fetchStore()', () => {
        service.fetchStore(22).subscribe();
        let req = httpMock.expectOne(`${environment.SFA_BILLING_API}/store/22`);
        expect(req.request.method).toBe('GET');
    });

    it('should POST /store on createStore()', () => {
        service.create({someProp: 'someValue'}).subscribe();
        let req = httpMock.expectOne(`${environment.SFA_BILLING_API}/store`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({store: {someProp: 'someValue'}});
    });

    it('should PATCH /store/id on updateStore()', () => {
        service.update({someProp: 'someValue', id: 22}).subscribe();
        let req = httpMock.expectOne(`${environment.SFA_BILLING_API}/store/22`);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual({store: {someProp: 'someValue'}});
    });
});
