import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class PasswordRecoveryService {

    constructor(protected httpClient: HttpClient) {
    }

    sendRecoveryEmail(name) {
        const body = new HttpParams()
            .set('name', name);
        return this.httpClient.post(environment.APP_URL + '/lib/scripts/password.php', body.toString(), {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            }
        );
    }

    resetPassword(token, name, password) {
        const params = new HttpParams()
            .set('name', name)
            .set('token', token)
            .set('password', password);
        return this.httpClient.post(environment.APP_URL + '/lib/scripts/resetpassword.php', params.toString(), {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
                responseType: 'text',
            }
        );
    }

}
