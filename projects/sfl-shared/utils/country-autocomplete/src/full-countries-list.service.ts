import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Country, SFL_COUNTRIES_LIST_LINK } from 'sfl-shared/entities';

/**
 * Load countries for the countries autocomplete component with translations according to the current locale.
 */

@Injectable({
    providedIn: 'root'
})
export class FullCountriesListService {

    countries = new BehaviorSubject<Country[]>([]);

    constructor(@Inject(LOCALE_ID) protected localeId,
                @Inject(SFL_COUNTRIES_LIST_LINK) protected countriesListLink,
                protected httpClient: HttpClient) {
        this.httpClient.get(`${this.countriesListLink}/names/${this.localeId}.json`).subscribe((data: any) => {
            this.countries.next(data);
        });
    }

    getCountries() {
        return this.countries.asObservable();
    }
}
