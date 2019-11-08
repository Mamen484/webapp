import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { SquarespaceStore } from 'sfl-shared/entities';
import { SquarespaceService } from '../squarespace.service';
import { catchError, flatMap } from 'rxjs/operators';
import { SflAuthService } from 'sfl-shared/services';

@Injectable({
    providedIn: 'root'
})
export class ResolveStoreGuard implements Resolve<SquarespaceStore> {


    constructor(protected service: SquarespaceService,
                protected authService: SflAuthService,
                protected router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<SquarespaceStore> {
        return this.service.getStore(route.queryParamMap.get('code')).pipe(
            flatMap(store => {
                if (store.storeId) {
                    return this.service.patchStore(store).pipe(flatMap(
                        () => {
                            this.authService.loginByToken(store.sfToken);
                            this.router.navigate(['/'], {queryParams: {store: store.storeId}});
                            return EMPTY;
                        })
                    );
                }

                return of(store);
            }),
            catchError(() => {
                this.router.navigate(['squarespace', 'error']);
                return EMPTY;
            }),
        );
    }

}
