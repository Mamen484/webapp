import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OverlayActiveService {

    protected overlayActive$ = new Subject<boolean>();

    constructor() {
    }

    setActive() {
        // ensure that 'active' event will be sent after 'inactive'
        timer(200).subscribe(() => {
            this.overlayActive$.next(true);
        });
    }

    setInactive() {
        this.overlayActive$.next(false);
    }

    isActive() {
        return this.overlayActive$.asObservable();
    }
}
