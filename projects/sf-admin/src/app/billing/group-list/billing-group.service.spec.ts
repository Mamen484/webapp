import { TestBed } from '@angular/core/testing';

import { BillingGroupService } from './billing-group.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('BillingGroupService', () => {
    let httpMock: HttpTestingController;
    let service: BillingGroupService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });

        service = TestBed.get(BillingGroupService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should GET /group on fetchStoreCollection()', () => {
        service.fetchGroupCollection({limit: 22, page: 15}).subscribe();
        let req = httpMock.expectOne(`${environment.SFA_BILLING_API}/group?limit=22&page=15`);
        expect(req.request.method).toBe('GET');
    });

    it('should GET /group/id on fetchStore()', () => {
        service.fetchStore(22).subscribe();
        let req = httpMock.expectOne(`${environment.SFA_BILLING_API}/group/22`);
        expect(req.request.method).toBe('GET');
    });

    it('should POST /group on create()', () => {
        service.create({name: 'someValue', id: 22, stores: [{id: 13}, {id: 220}]}).subscribe();
        let req = httpMock.expectOne(`${environment.SFA_BILLING_API}/group`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({group: {name: 'someValue', stores: [{id: 13, primary: true}, {id: 220, primary: false}]}});
    });

    it('should PUT /group/id on update()', () => {
        service.update({name: 'someValue', id: 22, stores: [{id: 13}, {id: 220}]}).subscribe();
        let req = httpMock.expectOne(`${environment.SFA_BILLING_API}/group/22`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual({group: {name: 'someValue', stores: [{id: 13, primary: true}, {id: 220, primary: false}]}});
    });
});
