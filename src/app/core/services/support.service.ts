import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SearchArticlesPage } from '../entities/search-articles-page';
import { Observable } from 'rxjs/Observable';
import { LocaleIdService } from './locale-id.service';

@Injectable()
export class SupportService {

    constructor(protected httpClient: HttpClient,
                protected localeidService: LocaleIdService) {
    }

    searchArticles(searchQuery): Observable<SearchArticlesPage> {
        return this.httpClient.get(environment.API_URL + '/desk/articles/search', {
            params: new HttpParams()
                .set('text', searchQuery)
                .set('in_support_center', 'true')
                .set('locale', this.localeidService.getHelpCenterLanguage())
        }) as Observable<SearchArticlesPage>;
    }

}
