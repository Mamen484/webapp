import { TestBed } from '@angular/core/testing';

import { SflToggleSidebarService } from './toggle-sidebar.service';
import { count, take } from 'rxjs/operators';

describe('ToggleSidebarService', () => {
    let service: SflToggleSidebarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SflToggleSidebarService]
        });

        service = TestBed.get(SflToggleSidebarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should emit a toggle event on toggleSidebar call', async () => {
        const countPromise = service.getSubscription().pipe(take(1), count()).toPromise();
        service.toggleSidebar();
        expect(await countPromise).toBe(1);
    });
});
