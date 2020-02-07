import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {BillingStoreService} from '../store-list/billing-store.service';
import {BillingStore} from '../store-list/billing-store';
import {SftSearchService} from 'sfl-tools/async-autocomplete-search';

@Injectable()
export class SearchBillingStoreService implements SftSearchService<BillingStore> {

    constructor(protected storeService: BillingStoreService) {
    }

    getResults(search = '') {
        return this.storeService.fetchStoreCollection({search}).pipe(map(response => response._embedded.store))
    }

}
