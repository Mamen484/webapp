import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SearchArticlesPage } from '../entities/search-articles-page';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SupportService {

    constructor(protected httpClient: HttpClient) {
    }

    searchArticles(searchQuery): Observable<SearchArticlesPage> {
        return this.httpClient.get(environment.SUPPORT_URL + '/api/v2/articles/search', {
            params: new HttpParams()
                .set('text', searchQuery)
                .set('in_support_center', 'true')
        }) as Observable<SearchArticlesPage>;
    }

}
