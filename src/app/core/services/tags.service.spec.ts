import { TestBed } from '@angular/core/testing';

import { TagsService } from './tags.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Tag } from '../entities/tag';

describe('TagsService', () => {
    let service: TagsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TagsService],
            imports: [HttpClientTestingModule],
        });
    });

    beforeEach(() => {
        service = TestBed.get(TagsService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should GET /store/${storeId}/order/tag when call fetchAll()', () => {
        service.fetchAll(31).subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/store/31/order/tag`);
        httpMock.verify();
        expect(req.request.method).toEqual('GET');
    });

    it('should POST /store/${storeId}/order/tag when call create()', () => {
        service.create(31, {name: 'name1', color: 'color1'}).subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/store/31/order/tag`);
        httpMock.verify();
        expect(req.request.method).toEqual('POST');
        expect(req.request.body.tag.name).toEqual('name1');
        expect(req.request.body.tag.color).toEqual('color1');
    });

    it('should PUT /store/${storeId}/order/tag when call update()', () => {
        service.update(31, 21, {name: 'name2', color: 'color2'}).subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/store/31/order/tag/21`);
        httpMock.verify();
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body.tag.name).toEqual('name2');
        expect(req.request.body.tag.color).toEqual('color2');
    });

    it('should DELETE /store/${storeId}/order/tag when call remove()', () => {
        service.remove(32, 22).subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/store/32/order/tag/22`);
        httpMock.verify();
        expect(req.request.method).toEqual('DELETE');
    });

    it('should POST /store/${storeId}/order/tag/{$tagId}/link when call assignTags', () => {
        service.assignTags(14, <Tag[]>[{id: 2}, {id: 3}], [15, 16]).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/store/14/order/tag/2/link`);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body.order).toEqual([15, 16]);

        req = httpMock.expectOne(`${environment.API_URL}/store/14/order/tag/3/link`);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body.order).toEqual([15, 16]);
        httpMock.verify();
    });

    it('should DELETE /store/${storeId}/order/tag/{$tagId}/link when call unassignTags', () => {
        service.unassignTags(14, <Tag[]>[{id: 2}, {id: 3}], [15, 16]).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/store/14/order/tag/2/link?order=15,16`);
        expect(req.request.method).toEqual('DELETE');

        req = httpMock.expectOne(`${environment.API_URL}/store/14/order/tag/3/link?order=15,16`);
        expect(req.request.method).toEqual('DELETE');
        httpMock.verify();
    });

});
