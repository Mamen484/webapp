import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateStoreModel } from '../../core/entities/create-store-model';

@Injectable()
export class CreatePasswordService {
    /**
     * @type {string}
     */
    private apiUrl = environment.API_URL;

    constructor(private http: Http) {
    }

    public createPassword(store: CreateStoreModel): Observable<{ success: boolean }> {
        return this.http.post(this.apiUrl + '/store', store, {headers: this.getHeaders()})
            .map((response: Response) => {
                return {success: response.status < 300 && response.status >= 200}
            });
    }

    private getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', environment.DEFAULT_AUTHORIZATION);

        return headers;
    }
}
