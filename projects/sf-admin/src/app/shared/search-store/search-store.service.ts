import { Injectable } from '@angular/core';
import { StoreService } from 'sfl-shared/services';
import { SflSearchService } from 'sfl-shared/utils/async-autocomplete-search';
import { Store } from 'sfl-shared/entities';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchStoreService implements SflSearchService<Store> {

    constructor(protected storeService: StoreService) {
    }

    getResults(filter = '') {
        return this.storeService.fetchAvailableStores(filter).pipe(map(response => response._embedded.store))
    }

}
