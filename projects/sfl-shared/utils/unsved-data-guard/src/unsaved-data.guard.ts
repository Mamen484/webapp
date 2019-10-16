import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UnsavedDataInterface } from './unsaved-data.interface';

/**
 * CanDeactivate guard can be called multiple times, so we nee to assure that the deactivation dialog is opened only one time
 */
const guardDebounce = 200;

@Injectable({
    providedIn: 'root'
})
export class UnsavedDataGuard implements CanDeactivate<UnsavedDataInterface> {

    lastEmit = new Date();

    canDeactivate(component: UnsavedDataInterface): Observable<boolean> {
        console.log(component);
        if (component.hasModifications() && this.lastEmit.getTime() < new Date().getTime() - guardDebounce) {
            this.lastEmit = new Date();
            return component.showCloseDialog();
        }
        return of(true);
    }
}
