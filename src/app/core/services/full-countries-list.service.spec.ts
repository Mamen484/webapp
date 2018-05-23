import { FullCountriesListService } from './full-countries-list.service';
import { HttpClient } from '@angular/common/http';
import { EMPTY, of } from 'rxjs';
import { take } from 'rxjs/operators';

describe('FullCountriesListService', () => {

    let service: FullCountriesListService;
    let httpClient: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        httpClient = jasmine.createSpyObj(['get']);
    });

    it('should be created', () => {
        httpClient.get.and.returnValue(EMPTY);
        service = new FullCountriesListService('en', httpClient);
        expect(service).toBeTruthy();
    });

    it('should fetch a proper file with countries for a specified locale', () => {
        httpClient.get.and.returnValue(EMPTY);
        service = new FullCountriesListService('en', httpClient);
        expect(httpClient.get).toHaveBeenCalledWith(`assets/countries/en.json`)
    });

    it('should fetch a proper file with countries for a specified locale', () => {
        httpClient.get.and.returnValue(EMPTY);
        service = new FullCountriesListService('fr', httpClient);
        expect(httpClient.get).toHaveBeenCalledWith(`assets/countries/fr.json`)
    });

    it('should return fetched countries on getCountries() call', async () => {
        httpClient.get.and.returnValue(of('some countries array'));
        service = new FullCountriesListService('fr', httpClient);
        let countries = await service.getCountries().pipe(take(1)).toPromise();
        expect(countries).toEqual(<any>'some countries array');
    });
});
