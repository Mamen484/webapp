import { Injectable } from '@angular/core';
import { SflSearchService } from 'sfl-shared/utils/async-autocomplete-search';
import { Country } from '../../../../../../../src/app/core/entities/country';
import { countriesList } from './countries';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchCountryService implements SflSearchService<Country> {

    getResults(searchQuery: string) {
        return of(countriesList.filter(country => country.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }


}
