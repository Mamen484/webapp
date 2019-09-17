import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppcuesEnabledService {

    protected enabled$ = new BehaviorSubject(false);

    constructor() {
    }

    setEnabled() {
        this.enabled$.next(true);
    }

    getState() {
        return this.enabled$.asObservable();
    }
}
