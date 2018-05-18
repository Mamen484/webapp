import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Order } from '../entities/orders/order';
import { OrdersService } from '../services/orders.service';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { catchError, flatMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OrderDetailsResolveGuard implements Resolve<Order | boolean> {

    constructor(protected appStore: Store<AppState>, protected service: OrdersService, protected router: Router) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.service.fetchOrder(store.id, route.params.id).pipe(
                catchError(({status}) => {
                    this.router.navigate(
                        [status === 404 ? 'order-not-found' : 'critical-error'],
                        {skipLocationChange: true}
                    );
                    return of(false);
                }),
            ))
        );
    }
}