import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SflLocalStorageService } from 'sfl-shared';

@Injectable()
export class UserService {


    constructor(protected httpClient: HttpClient,
                protected localStorage: SflLocalStorageService) {
    }

    public fetchAggregatedInfo(): Observable<AggregatedUserInfo> {
            return this.httpClient.get(`${environment.API_URL}/me`)
                .pipe(map(userInfo => AggregatedUserInfo.create(userInfo)));
    }

    public login(username, password) {
        return this.httpClient.post(`${environment.API_URL}/auth`, {
            grant_type: 'password',
            username,
            password
        }).pipe(tap(({token_type, access_token}: any) => {
            this.localStorage.setItem('Authorization', `${token_type} ${access_token}`);
        }));
    }

}

