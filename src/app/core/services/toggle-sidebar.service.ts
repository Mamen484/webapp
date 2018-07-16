import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ToggleSidebarService {

    subject$ = new Subject();

    constructor() {
    }

    toggleSidebar() {
        this.subject$.next();
    }

    getSubscription() {
        return this.subject$.asObservable();
    }

}