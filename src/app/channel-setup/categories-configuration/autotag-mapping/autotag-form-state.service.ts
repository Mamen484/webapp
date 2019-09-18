import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AutotagFormState } from './autotag-form-state.enum';

@Injectable({
    providedIn: 'root'
})
export class AutotagFormStateService {

    protected state$ = new BehaviorSubject<AutotagFormState>(AutotagFormState.pristine);

    constructor() {
    }

    changeState(state: AutotagFormState) {
        if (this.state$.value !== state) {
            this.state$.next(state);
        }
    }

    getState() {
        return this.state$.asObservable();
    }
}
