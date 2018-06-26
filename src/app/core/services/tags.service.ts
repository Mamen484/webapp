import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/index';
import { Tag } from '../entities/tag';
import { PagedResponse } from '../entities/paged-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TagsService {

    constructor(protected httpClient: HttpClient) {
    }

    public fetchAll(storeId) {
        return this.httpClient.get(`${environment.API_URL}/store/${storeId}/tag`) as
            Observable<PagedResponse<{ tag: Tag[] }>>;
    }

    public create(storeId, {name, color, orders = []}: Tag) {
        return this.httpClient.post(`${environment.API_URL}/store/${storeId}/tag`, {tag: {name, color, orders}});
    }

    public remove(storeId, tagId) {
        return this.httpClient.delete(`${environment.API_URL}/store/${storeId}/tag/${tagId}`);
    }

    public update(storeId, tagId, tag: Tag) {
        return this.httpClient.put(`${environment.API_URL}/store/${storeId}/tag/${tagId}`, {tag});
    }
}
