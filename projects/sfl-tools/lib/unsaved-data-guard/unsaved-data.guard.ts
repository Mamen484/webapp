import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UnsavedDataInterface} from './unsaved-data.interface';
import {tap} from 'rxjs/operators';

/**
 * CanDeactivate guard can be called multiple times, so we neeD to assure that the deactivation dialog is opened only one time
 */
const guardDebounce = 200;

@Injectable({
    providedIn: 'root'
})
export class UnsavedDataGuard implements CanDeactivate<UnsavedDataInterface> {

    lastEmit = new Date(0).getTime();

    canDeactivate(component: UnsavedDataInterface): Observable<boolean> {
        if (component.hasModifications() && this.lastEmit < (new Date().getTime() - guardDebounce)) {
            return component.showCloseDialog()
                .pipe(tap(() => this.lastEmit = new Date().getTime()));
        }
        return of(true);
    }
}
