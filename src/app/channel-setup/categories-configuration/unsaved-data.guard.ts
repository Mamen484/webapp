import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesConfigurationComponent } from './categories-configuration.component';

@Injectable({
    providedIn: 'root'
})
export class UnsavedDataGuard implements CanDeactivate<CategoriesConfigurationComponent> {
    canDeactivate(component: CategoriesConfigurationComponent): Observable<boolean> | boolean {
        return component.hasModifications()
            ? component.showCloseDialog()
            : true;
    }
}
