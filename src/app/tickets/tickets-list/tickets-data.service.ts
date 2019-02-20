import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TicketsDataService {
    protected updateRequested$ = new Subject();

    requestUpdate() {
        this.updateRequested$.next();
    }

    watchUpdates() {
        return this.updateRequested$.asObservable();
    }
}

