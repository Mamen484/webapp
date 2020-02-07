import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { UnsavedDataGuard } from './unsaved-data.guard';
import { UnsavedDataInterface } from './unsaved-data.interface';
import {of, Subject} from 'rxjs';

describe('UnsavedDataGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UnsavedDataGuard]
        });
    });

    it('should open dialog only once', inject([UnsavedDataGuard], (guard: UnsavedDataGuard) => {
        const component: jasmine.SpyObj<UnsavedDataInterface> = jasmine.createSpyObj(['hasModifications', 'showCloseDialog']);
        component.hasModifications.and.returnValue(true);
        component.showCloseDialog.and.returnValue(of(true));
        guard.canDeactivate(component).subscribe();
        guard.canDeactivate(component).subscribe();
        guard.canDeactivate(component).subscribe();
        expect(component.showCloseDialog).toHaveBeenCalledTimes(1);
    }));

    it('should open dialog for each deactivation', inject([UnsavedDataGuard], fakeAsync((guard: UnsavedDataGuard) => {
        const component: jasmine.SpyObj<UnsavedDataInterface> = jasmine.createSpyObj(['hasModifications', 'showCloseDialog']);
        component.hasModifications.and.returnValue(true);
        component.showCloseDialog.and.returnValue(of(true));
        guard.canDeactivate(component).subscribe();
        tick(300);
        guard.canDeactivate(component).subscribe();
        expect(component.showCloseDialog).toHaveBeenCalledTimes(2);
    })));

    it('should not open a dialog if another one has just been closed', inject([UnsavedDataGuard], fakeAsync((guard: UnsavedDataGuard) => {
        const component: jasmine.SpyObj<UnsavedDataInterface> = jasmine.createSpyObj(['hasModifications', 'showCloseDialog']);
        component.hasModifications.and.returnValue(true);
        let subject = new Subject();
        component.showCloseDialog.and.returnValue(<any>subject.asObservable());
        tick(300);
        guard.canDeactivate(component).subscribe();
        subject.complete();
        guard.canDeactivate(component).subscribe();
        expect(component.showCloseDialog).toHaveBeenCalledTimes(2);
    })));
});
