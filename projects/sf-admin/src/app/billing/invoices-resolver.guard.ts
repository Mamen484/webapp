import { Injectable } from '@angular/core';
import { BillingStoreService } from './store-list/billing-store.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from './store-list/invoicing-details/invoice';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InvoicesResolverGuard implements Resolve<Observable<Invoice[]>> {
    constructor(protected billingStoreService: BillingStoreService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invoice[]> {
        return this.billingStoreService.fetchInvoicesCollection(route.params.storeId).pipe(map(response => response._embedded.invoice));
    }
}
