import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SflLocalStorageService } from '../core/local-storage.service';
import { SFL_API } from '../core/entities/src/sfl-dependencies';

@Injectable({
    providedIn: 'root'
})
export class SflAuthService {

    constructor(protected httpClient: HttpClient,
                protected localStorage: SflLocalStorageService,
                @Inject(SFL_API) protected sflApi) {
    }

    public login(username: string, password: string) {
        return this.httpClient.post(`${this.sflApi}/auth`, {
            grant_type: 'password',
            username,
            password
        }).pipe(tap(({token_type, access_token}: any) => {
            this.localStorage.setItem('Authorization', `${token_type} ${access_token}`);
        }));
    }

    public logout() {
        this.localStorage.removeItem('Authorization');
    }
}
