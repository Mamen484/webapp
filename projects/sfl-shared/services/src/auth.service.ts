import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SflLocalStorageService } from './local-storage.service';
import { SFL_API } from 'sfl-shared/entities';

/**
 * A service that enables you to handle the authentication.
 */
@Injectable({
    providedIn: 'root'
})
export class SflAuthService {

    constructor(protected httpClient: HttpClient,
                protected localStorage: SflLocalStorageService,
                @Inject(SFL_API) protected sflApi) {
    }

    /**
     * Send the login request, saving the Authorization to a storage
     *
     * @param username
     * @param password
     */
    public login(username: string, password: string) {
        return this.httpClient.post(`${this.sflApi}/auth`, {
            grant_type: 'password',
            username,
            password
        }).pipe(tap(({token_type, access_token}: any) => {
            this.localStorage.setItem('Authorization', `${token_type} ${access_token}`);
        }));
    }

    /**
     * Remove the authorization from a storage
     */
    public logout() {
        this.localStorage.removeItem('Authorization');
    }

    /**
     * Check if there is an authorization info about a current user in a storage
     */
    public isLoggedIn() {
        return Boolean(this.localStorage.getItem('Authorization'));
    }

    /**
     * Get the Authorization string to be used in the calls to API
     */
    public getAuthString() {
        return this.localStorage.getItem('Authorization');
    }

    /**
     * Retrive the token from the Authorization string
     */
    public getAuthToken() {
        const authString = this.getAuthString();
        return authString ? authString.replace('Bearer ', '') : '';
    }
}
