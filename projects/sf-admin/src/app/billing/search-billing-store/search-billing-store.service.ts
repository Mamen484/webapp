import { Injectable } from '@angular/core';
import { SflSearchService } from 'sfl-shared/utils/async-autocomplete-search';
import { map } from 'rxjs/operators';
import { BillingStoreService } from '../store-list/billing-store.service';
import { BillingStore } from '../store-list/billing-store';

@Injectable()
export class SearchBillingStoreService implements SflSearchService<BillingStore> {

    constructor(protected storeService: BillingStoreService) {
    }

    getResults(search = '') {
        return this.storeService.fetchStoreCollection({search}).pipe(map(response => response._embedded.store))
    }

}
