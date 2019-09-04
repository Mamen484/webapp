import { TestBed } from '@angular/core/testing';

import { AutotagFormStateService } from './autotag-form-state.service';
import { AutotagFormState } from './autotag-form-state.enum';

describe('AutotagFormStateService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: AutotagFormStateService = TestBed.get(AutotagFormStateService);
        expect(service).toBeTruthy();
    });

    it('should emit only changed values', async () => {
        const service: AutotagFormStateService = TestBed.get(AutotagFormStateService);
        const values = [];
        service.getState().subscribe(value => values.push(value));
        service.changeState(AutotagFormState.pristine);
        service.changeState(AutotagFormState.pristine);
        service.changeState(AutotagFormState.dirty);
        service.changeState(AutotagFormState.dirty);
        service.changeState(AutotagFormState.dirty);
        service.changeState(AutotagFormState.pristine);
        service.changeState(AutotagFormState.pristine);
        expect(values).toEqual([AutotagFormState.pristine, AutotagFormState.dirty, AutotagFormState.pristine]);
    });
});
