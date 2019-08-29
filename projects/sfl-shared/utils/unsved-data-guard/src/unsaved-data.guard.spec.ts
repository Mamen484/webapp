import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { UnsavedDataGuard } from './unsaved-data.guard';
import { UnsavedDataInterface } from './unsaved-data.interface';
import { of } from 'rxjs';

describe('UnsavedDataGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UnsavedDataGuard]
        });
    });

    it('should open dialog only once', inject([UnsavedDataGuard], fakeAsync((guard: UnsavedDataGuard) => {
        const component: jasmine.SpyObj<UnsavedDataInterface> = jasmine.createSpyObj(['hasModifications', 'showCloseDialog']);
        component.hasModifications.and.returnValue(true);
        component.showCloseDialog.and.returnValue(of(true));
        tick(300);
        guard.canDeactivate(component).subscribe();
        guard.canDeactivate(component).subscribe();
        guard.canDeactivate(component).subscribe();
        tick(300);
        expect(component.showCloseDialog).toHaveBeenCalledTimes(1);
    })));

    it('should open dialog for each deactivation', inject([UnsavedDataGuard], fakeAsync((guard: UnsavedDataGuard) => {
        const component: jasmine.SpyObj<UnsavedDataInterface> = jasmine.createSpyObj(['hasModifications', 'showCloseDialog']);
        component.hasModifications.and.returnValue(true);
        component.showCloseDialog.and.returnValue(of(true));
        tick(300);
        guard.canDeactivate(component).subscribe();
        tick(300);
        guard.canDeactivate(component).subscribe();
        expect(component.showCloseDialog).toHaveBeenCalledTimes(2);
    })));
});
