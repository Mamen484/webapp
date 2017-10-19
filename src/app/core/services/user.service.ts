import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { aggregatedUserInfoMock } from '../../../mocks/agregated-user-info-mock';

@Injectable()
export class UserService {


    constructor(protected httpClient: HttpClient,
                protected localStorage: LocalStorageService) {
    }

    public fetchAggregatedInfo(): Observable<AggregatedUserInfo> {
        return Observable.of(AggregatedUserInfo.create(aggregatedUserInfoMock));
            // return this.httpClient.get(`${environment.API_URL}/me`)
            //     .map(userInfo => AggregatedUserInfo.create(userInfo))
    }

    public login(username, password) {
        return this.httpClient.post(`${environment.API_URL}/auth`, {
            grant_type: 'password',
            username,
            password
        }).do(({token_type, access_token}: any) => {
            this.localStorage.setItem('Authorization', `${token_type} ${access_token}`);
        });
    }

}

