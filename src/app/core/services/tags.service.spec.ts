import { TestBed } from '@angular/core/testing';

import { TagsService } from './tags.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

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

    it('should GET /store/${storeId}/tag when call fetchAll()', () => {
        service.fetchAll(31).subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/store/31/tag`);
        httpMock.verify();
        expect(req.request.method).toEqual('GET');
    });

    it('should POST /store/${storeId}/tag when call create()', () => {
        service.create(31, {name: 'name1', color: 'color1'}).subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/store/31/tag`);
        httpMock.verify();
        expect(req.request.method).toEqual('POST');
        expect(req.request.body.tag.name).toEqual('name1');
        expect(req.request.body.tag.color).toEqual('color1');
    });

    it('should PUT /store/${storeId}/tag when call update()', () => {
        service.update(31, 21, {name: 'name2', color: 'color2'}).subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/store/31/tag/21`);
        httpMock.verify();
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body.tag.name).toEqual('name2');
        expect(req.request.body.tag.color).toEqual('color2');
    });

    it('should DELETE /store/${storeId}/tag when call remove()', () => {
        service.remove(32, 22).subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/store/32/tag/22`);
        httpMock.verify();
        expect(req.request.method).toEqual('DELETE');
    });
});
