import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Field } from './field';

@Injectable({
    providedIn: 'root'
})
export class ReferenceService {

    constructor(protected httpClient: HttpClient) {
    }

    getFields() {
        return this.httpClient.get(`${environment.apiLink}/reference/field`) as Observable<{ _embedded: { field: Field[] } }>;
    }
}
