import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class InternationalAccountService {

    constructor(protected httpClient: HttpClient) {
    }

    sendInternationalAccountRequest() {
        return this.httpClient.post(environment.APP_URL + '/channels/AjaxInternationalAccount', null);
    }

}
