import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Country } from '../entities/country';

/**
 * Load countries for the countries autocomplete component with translations according to the current locale.
 */

@Injectable({
    providedIn: 'root'
})
export class FullCountriesListService {

    countries = new BehaviorSubject<Country[]>([]);

    constructor(@Inject(LOCALE_ID) protected localeId, protected httpClient: HttpClient) {
        this.httpClient.get(`assets/countries/${this.localeId}.json`).subscribe((data: any) => {
            this.countries.next(data);
        });
    }

    getCountries() {
        return this.countries.asObservable();
    }
}
