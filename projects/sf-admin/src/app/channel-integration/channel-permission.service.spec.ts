import { TestBed } from '@angular/core/testing';

import { ChannelPermissionService } from './channel-permission.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChannelPermissionService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
    }));

    it('should be created', () => {
        const service: ChannelPermissionService = TestBed.get(ChannelPermissionService);
        expect(service).toBeTruthy();
    });
});
