import {Injectable} from '@angular/core';
import {StoreService} from 'sfl-shared/services';
import {Store} from 'sfl-shared/entities';
import {map} from 'rxjs/operators';
import {SftSearchService} from 'sfl-tools/src/lib/async-autocomplete-search';

@Injectable()
export class SearchStoreService implements SftSearchService<Store> {

    constructor(protected storeService: StoreService) {
    }

    getResults(filter = '') {
        return this.storeService.fetchAvailableStores(filter).pipe(map(response => response._embedded.store))
    }

}
