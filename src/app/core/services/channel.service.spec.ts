import { TestBed } from '@angular/core/testing';

import { ChannelService } from './channel.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChannelService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
    }));

    it('should be created', () => {
        const service: ChannelService = TestBed.get(ChannelService);
        expect(service).toBeTruthy();
    });
});
