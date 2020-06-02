import { TestBed } from '@angular/core/testing';

import { ChannelService } from './channel.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('ChannelService', () => {

    let service: ChannelService;
    let httpMock: HttpTestingController;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
    }));

    beforeEach(() => {
        service = TestBed.inject(ChannelService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call a proper endpoint on fetchChannelConstraintCollection call', () => {
        service.fetchChannelConstraintCollection(11, 14).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/channel/taxonomy/11/constraint?groupId=14&limit=200`);

        expect(req.request.method).toBe('GET');
    });

    it('should call a proper endpoint on fetchChannelConstraintCollection call when results are filtered', () => {
        service.fetchChannelConstraintCollection(11, 14, 'fba').subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/channel/taxonomy/11/constraint?groupId=14&limit=200&label=fba`);

        expect(req.request.method).toBe('GET');
    });

    it('should call a proper endpoint on fetchChannelConstraintCollection call  when results are filtered and the page is specified', () => {
        service.fetchChannelConstraintCollection(11, 14, 'fba', {page: '43'}).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/channel/taxonomy/11/constraint?groupId=14&limit=200&label=fba&page=43`);

        expect(req.request.method).toBe('GET');
    });

    it('should call a proper endpoint on getChannelCategories call', () => {
        service.getChannelCategories(11, {name: 'someName', page: '3', limit: '32', country: 'pl'}).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/channel/11/category?name=someName&page=3&limit=32&country=pl`);

        expect(req.request.method).toBe('GET');
    });

    it('should call a proper endpoint on getChannel call', () => {
        service.getChannel(11).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/channel/11`);

        expect(req.request.method).toBe('GET');
    });

});
