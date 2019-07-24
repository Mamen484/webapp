import { TestBed } from '@angular/core/testing';

import { ChannelPermissionService } from './channel-permission.service';

describe('ChannelPermissionService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ChannelPermissionService = TestBed.get(ChannelPermissionService);
        expect(service).toBeTruthy();
    });
});
