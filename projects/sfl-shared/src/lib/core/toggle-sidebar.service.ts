import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
