import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const DEBOUNCE_TIME = 100;

@Injectable({
    providedIn: 'root'
})
export class PageLoadingService {
    protected pageIsBeingLoaded$ = new BehaviorSubject(true);

    getState() {
        // do not emit a value that changed immediately
        return this.pageIsBeingLoaded$.asObservable().pipe(debounceTime(DEBOUNCE_TIME));
    }

    startLoading() {
        this.pageIsBeingLoaded$.next(true);
    }

    finishLoading() {
        this.pageIsBeingLoaded$.next(false);
    }
}
