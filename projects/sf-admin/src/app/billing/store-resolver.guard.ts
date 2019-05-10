import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BillingStoreService } from './store-list/billing-store.service';
import { BillingStore } from './store-list/billing-store';

@Injectable({
    providedIn: 'root'
})
export class StoreResolverGuard implements Resolve<Observable<BillingStore>> {

    constructor(protected billingStoreService: BillingStoreService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BillingStore> {
        return this.billingStoreService.fetchStore(route.params.storeId);
    }
}
