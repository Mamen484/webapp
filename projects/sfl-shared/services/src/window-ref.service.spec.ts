import { inject, TestBed } from '@angular/core/testing';

import { SflWindowRefService } from './window-ref.service';

describe('WindowRefService', () => {
    let service: SflWindowRefService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SflWindowRefService]
        });
        service = TestBed.get(SflWindowRefService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a window object', () => {
        expect(service.nativeWindow instanceof Window).toBe(true);
    });
});
