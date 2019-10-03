import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReferenceService } from './reference.service';
import { Field } from './field';

@Injectable({
    providedIn: 'root'
})
export class FieldsResolveGuard implements Resolve<Field[]> {

    constructor(protected referenceService: ReferenceService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Field[]> {
        return this.referenceService.getFields().pipe(
            map(response => response._embedded.field),
        )
    }


}
