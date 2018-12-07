import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Toggle if sidebar is visible/hidden and subscribe for it's state.
 */
@Injectable({
    providedIn: 'root'
})
export class SflToggleSidebarService {

    protected subject$ = new Subject();

    constructor() {
    }

    toggleSidebar() {
        this.subject$.next();
    }

    getSubscription() {
        return this.subject$.asObservable();
    }

}
