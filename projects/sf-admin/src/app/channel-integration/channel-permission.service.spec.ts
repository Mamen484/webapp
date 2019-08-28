import { TestBed } from '@angular/core/testing';

import { ChannelPermissionService } from './channel-permission.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('ChannelPermissionService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
    }));

    it('should be created', () => {
        const service: ChannelPermissionService = TestBed.get(ChannelPermissionService);
        expect(service).toBeTruthy();
    });

    it('should POST to /channel/permission on addChannelPermission() call', () => {
        const service: ChannelPermissionService = TestBed.get(ChannelPermissionService);
        const httpMock: HttpTestingController = TestBed.get(HttpTestingController);
        service.addChannelPermission(1, 2, ['edit']).subscribe();
        const req = httpMock.expectOne(`${environment.SFA_API}/channel/permission`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({permission: {channelId: 1, accountId: 2, allow: ['edit']}});
    });
});
