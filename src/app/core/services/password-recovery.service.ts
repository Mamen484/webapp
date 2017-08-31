import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class PasswordRecoveryService {

    constructor(protected httpClient: HttpClient) {
    }

    resetPassword(name) {
        let body = new URLSearchParams();
        body.set('name', name);
        return this.httpClient.post(environment.APP_URL + '/lib/scripts/password.php', body.toString(), {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            }
        );
    }

}
