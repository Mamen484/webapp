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
        service = TestBed.get(ChannelService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call a proper endpoint on fetchChannelConstraintCollection call', () => {
        service.fetchChannelConstraintCollection(11, 14).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/channel/taxonomy/11/constraint?groupId=14`);

        expect(req.request.method).toBe('GET');
    });

    it('should call a proper endpoint on fetchChannelConstraintCollection call when results are filtered', () => {
        service.fetchChannelConstraintCollection(11, 14, 'fba').subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/channel/taxonomy/11/constraint?groupId=14&label=fba`);

        expect(req.request.method).toBe('GET');
    });
});
