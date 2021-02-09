import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SFL_API } from 'sfl-shared/entities';
import { ChannelService } from './channel.service';

describe('ChannelService', () => {
    let service: ChannelService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {provide: SFL_API, useValue: 'someLink'},
            ],
        });
        service = TestBed.get(ChannelService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should POST to /channel on createChannel() call', () => {
        service.createChannel(<any>{}).subscribe();
        let req = httpMock.expectOne('someLink/channel');
        expect(req.request.method).toBe('POST');
    });

    it('should GET /channel on listChannels() call', () => {
        service.listChannels().subscribe();
        let req = httpMock.expectOne('someLink/channel');
        expect(req.request.method).toBe('GET');
    });

    it('should GET /channel with params on listChannels() call', () => {
        service.listChannels({
            search: 'someName',
            permission: 'perm',
            state: 'state',
            limit: 14,
            page: 4,
            country: 'fr',
            segment: 'segment-1',
            type: 'ads',
        }).subscribe();
        let req = httpMock.expectOne('someLink/channel?permission=perm&state=state&limit=14&page=4&name=someName&country=fr&segment=segment-1&type=ads');
        expect(req.request.method).toBe('GET');
    });

    it('should PUT to /channel/{id} on createChannel() call', () => {
        service.modifyChannel(<any>{}, 23).subscribe();
        let req = httpMock.expectOne('someLink/channel/23');
        expect(req.request.method).toBe('PUT');
    });

    it('should PUT to /channel/{id}/activate on activate() call', () => {
        service.activate(23).subscribe();
        let req = httpMock.expectOne('someLink/channel/23/activate');
        expect(req.request.method).toBe('PUT');
    });

    it('should PUT to /channel/{id}/deactivate on deactivate() call', () => {
        service.deactivate(23).subscribe();
        let req = httpMock.expectOne('someLink/channel/23/deactivate');
        expect(req.request.method).toBe('PUT');
    });

    it('should GET /channel/{id} on fetchChannel() call', () => {
        service.fetchChannel(15).subscribe();
        let req = httpMock.expectOne('someLink/channel/15');
        expect(req.request.method).toBe('GET');
    });
});
