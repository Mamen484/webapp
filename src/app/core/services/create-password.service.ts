import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { CreateStoreModel } from '../entities/create-store-model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CreatePasswordService {
    /**
     * @type {string}
     */
    protected apiUrl = environment.API_URL;

    constructor(protected httpClient: HttpClient) {
    }

    public createPassword(store: CreateStoreModel) {
        return this.httpClient.post(this.apiUrl + '/store', {store}) as Observable<CreateStoreModel>;
    }
}
