import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ChannelService } from './channel.service';
import { environment } from '../../../environments/environment';

describe('ChannelService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ], providers: [
                ChannelService
            ]
        })
    });

    it('should be created', inject([ChannelService, HttpTestingController], (service: ChannelService, httpMock: HttpTestingController) => {
        expect(service).toBeTruthy();
    }));

    it('should request /channel resource with specified params',
        inject([ChannelService, HttpTestingController],
            (service: ChannelService, httpMock: HttpTestingController) => {
                service.getChannels({
                    page: 3, limit: 12, searchQuery: 'qqrrt', country: 'pt', type: 'marketplace'
                }).subscribe();
                let requestUrl = '/channel?page=3&limit=12&country=pt&name=qqrrt&type=marketplace&segment=&status=';
                const req = httpMock.expectOne(environment.API_URL + requestUrl);
                expect(req.request.method).toEqual('GET');
                httpMock.verify();
            }));
});
