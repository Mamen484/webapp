import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SearchArticlesPage } from '../entities/search-articles-page';
import { Observable } from 'rxjs';
import { SflLocaleIdService } from 'sfl-shared/services';

@Injectable()
export class SupportService {

    public helpCenterLanguage;

    constructor(protected httpClient: HttpClient,
                protected localeIdService: SflLocaleIdService) {
        this.helpCenterLanguage = this.getHelpCenterLanguage(this.localeIdService.localeId);
    }

    searchArticles(searchQuery): Observable<SearchArticlesPage> {
        return this.httpClient.get(environment.API_URL + '/desk/articles/search', {
            params: new HttpParams()
                .set('text', searchQuery)
                .set('in_support_center', 'true')
                .set('locale', this.helpCenterLanguage)
        }) as Observable<SearchArticlesPage>;
    }

    protected getHelpCenterLanguage(localeId) {
        switch (localeId) {
            case 'it':
            case 'es':
                return localeId;

            case'fr':
                return 'fr_fr';

            default:
                return 'en';
        }
    }

}
