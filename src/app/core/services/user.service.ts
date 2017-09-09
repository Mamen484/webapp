import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class UserService {

    protected aggregatedInfoCache;

    constructor(protected httpClient: HttpClient, protected windowRef: WindowRefService) {
    }

    public fetchAggregatedInfo(withoutCache = false) {
        if (!this.aggregatedInfoCache || withoutCache) {
            return <Observable<AggregatedUserInfo>>(this.httpClient.get(`${environment.API_URL}/me`))
                .do(data => this.aggregatedInfoCache = data);
        }
        return Observable.of(this.aggregatedInfoCache);
    }

    public login(username, password) {
        return this.httpClient.post(`${environment.API_URL}/auth`, {
            grant_type: 'password',
            username,
            password
        }).do(({token_type, access_token}: any) => {
            this.windowRef.nativeWindow.localStorage.setItem('Authorization', `${token_type} ${access_token}`);
        });
    }

}

