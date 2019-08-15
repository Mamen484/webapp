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
        service.listChannels('someName').subscribe();
        let req = httpMock.expectOne('someLink/channel?name=someName');
        expect(req.request.method).toBe('GET');
    });

    it('should PUT to /channel/{id} on createChannel() call', () => {
        service.modifyChannel(<any>{}, 23).subscribe();
        let req = httpMock.expectOne('someLink/channel/23');
        expect(req.request.method).toBe('PUT');
    });
});
