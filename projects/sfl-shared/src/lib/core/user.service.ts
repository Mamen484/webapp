import { Inject, Injectable } from '@angular/core';
import { AggregatedUserInfo } from './entities/src/aggregated-user-info';
import { ConnectableObservable, Observable } from 'rxjs';
import { map, publishReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SflLocalStorageService } from './local-storage.service';
import { SFL_API } from './entities/src/sfl-dependencies';

@Injectable()
export class SflUserService {

    userInfo$: ConnectableObservable<AggregatedUserInfo>;

    constructor(protected httpClient: HttpClient,
                protected localStorage: SflLocalStorageService,
                @Inject(SFL_API) protected sflApi) {
    }

    public fetchAggregatedInfo(): Observable<AggregatedUserInfo> {
        if (!this.userInfo$) {
            this.userInfo$ = this.httpClient.get(`${this.sflApi}/me`)
                .pipe(map(userInfo => AggregatedUserInfo.create(userInfo)),
                    publishReplay()) as ConnectableObservable<AggregatedUserInfo>;
            this.userInfo$.connect();
        }
        return this.userInfo$;
    }

    public login(username, password) {
        return this.httpClient.post(`${this.sflApi}/auth`, {
            grant_type: 'password',
            username,
            password
        }).pipe(tap(({token_type, access_token}: any) => {
            this.localStorage.setItem('Authorization', `${token_type} ${access_token}`);
        }));
    }

}

