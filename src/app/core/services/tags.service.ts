import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, zip } from 'rxjs';
import { Tag } from '../entities/tag';
import { PagedResponse } from 'sfl-shared/entities';
import { HttpClient, HttpParams } from '@angular/common/http';

const maxApiLimit = '200';

@Injectable({
    providedIn: 'root'
})
export class TagsService {

    constructor(protected httpClient: HttpClient) {
    }

    public fetchAll(storeId) {

        let queryParams = new HttpParams()
            .set('limit', maxApiLimit);
        return this.httpClient.get(`${environment.API_URL}/store/${storeId}/order/tag`, {params: queryParams}) as
            Observable<PagedResponse<{ tag: Tag[] }>>;
    }

    public create(storeId, {name, color}: Tag) {
        return this.httpClient.post(`${environment.API_URL}/store/${storeId}/order/tag`, {tag: {name, color}});
    }

    public remove(storeId, tagId) {
        return this.httpClient.delete(`${environment.API_URL}/store/${storeId}/order/tag/${tagId}`);
    }

    public update(storeId, tagId, {name, color}: Tag) {
        return this.httpClient.put(`${environment.API_URL}/store/${storeId}/order/tag/${tagId}`, {tag: {name, color}});
    }

    public assignTags(storeId, tags: Tag[], order: number[]) {
        return zip(...tags.map(tag =>
                this.httpClient.post(`${environment.API_URL}/store/${storeId}/order/tag/${tag.id}/link`, {order})
            )
        );
    }

    public unassignTags(storeId, tags: Tag[], order: number[]) {
        return zip(...tags.map(tag =>
            this.httpClient.delete(
                `${environment.API_URL}/store/${storeId}/order/tag/${tag.id}/link?order=${order.join(',')}`,
            )
        ));
    }

}
