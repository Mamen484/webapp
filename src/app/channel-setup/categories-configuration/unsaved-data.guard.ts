import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoriesConfigurationComponent } from './categories-configuration.component';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UnsavedDataGuard implements CanDeactivate<CategoriesConfigurationComponent> {
    canDeactivate(component: CategoriesConfigurationComponent): Observable<boolean> | boolean {
        return component.hasModifications()
            ? component.showCloseDialog().afterClosed().pipe(map(confirmed => confirmed || false))
            : true;
    }
}
