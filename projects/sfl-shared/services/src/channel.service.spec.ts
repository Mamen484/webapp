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
});
