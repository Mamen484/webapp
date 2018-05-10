import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Order } from '../entities/orders/order';
import { OrdersService } from '../services/orders.service';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { take, flatMap } from 'rxjs/operators';

@Injectable()
export class OrderDetailsResolveGuard implements Resolve<Order> {

    constructor(protected appStore: Store<AppState>, protected service: OrdersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.service.fetchOrder(store.id, route.params.id))
        );
    }
}