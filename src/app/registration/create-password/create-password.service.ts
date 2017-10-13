import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateStoreModel } from '../../core/entities/create-store-model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CreatePasswordService {
    /**
     * @type {string}
     */
    private apiUrl = environment.API_URL;

    constructor(private httpClient: HttpClient) {
    }

    public createPassword(store: CreateStoreModel) {
        return this.httpClient.post(this.apiUrl + '/store', {store}) as Observable<CreateStoreModel>;
    }
}
