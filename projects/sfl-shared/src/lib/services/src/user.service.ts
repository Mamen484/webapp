import { Inject, Injectable } from '@angular/core';
import { AggregatedUserInfo, SFL_API } from 'sfl-shared/src/lib/entities';
import { ConnectableObservable, Observable } from 'rxjs';
import { map, publishReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SflLocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
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
}

