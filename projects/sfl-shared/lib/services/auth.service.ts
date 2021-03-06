import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SflLocalStorageService } from './local-storage.service';
import { SFL_API } from 'sfl-shared/entities';
import { Location } from '@angular/common';

export const tokenInUrl = /token=[a-zA-Z0-9]*&?/;

// 1000 * 60 * 60
const hour = 3600000;
export const tokenExpiryKey = 'sflTokenExpires';

/**
 * A service that enables you to handle the authentication.
 */
@Injectable({
    providedIn: 'root'
})
export class SflAuthService {

    constructor(protected httpClient: HttpClient,
                protected localStorage: SflLocalStorageService,
                @Inject(SFL_API) protected sflApi,
                protected location: Location) {
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
            this.loginByToken(access_token, token_type);
        }));
    }

    /**
     * Save authorization into a local storage
     *
     * @param tokenType
     * @param token
     */
    public loginByToken(token: string, tokenType = 'Bearer') {
        this.localStorage.setItem('Authorization', `${tokenType} ${token}`);
        this.updateTokenExpiry();
    }

    /**
     * Set the auth token to expire one hour after now
     */
    public updateTokenExpiry() {
        this.localStorage.setItem(tokenExpiryKey, (new Date().getTime() + hour).toString());
    }

    /**
     * Remove the authorization from a storage
     */
    public logout() {
        this.localStorage.removeItem('Authorization');
        this.localStorage.removeItem(tokenExpiryKey);
    }

    /**
     * Check if there is an authorization info about a current user in a storage
     */
    public isLoggedIn() {
        return Boolean(this.localStorage.getItem('Authorization')) && !this.tokenExpired();
    }

    /**
     * Get the Authorization string to be used in the calls to API
     */
    public getAuthString() {
        return this.localStorage.getItem('Authorization');
    }

    /**
     * Retrieve the token from the Authorization string
     */
    public getAuthToken() {
        if (this.tokenExpired()) {
            return '';
        }
        const authString = this.getAuthString();
        return authString ? authString.replace('Bearer ', '') : '';
    }

    /**
     * Check if a token is expired
     */
    public tokenExpired() {
        const tokenExpires = +this.localStorage.getItem(tokenExpiryKey);
        if (tokenExpires < new Date().getTime()) {
            this.logout();
            return true;
        }
        return false;
    }

    /**
     * Remove a token from an url to prevent unneeded sharing the token by coping an url from a browser address bar.
     * Call it only after navigation ends to prevent removing the token before route guards finish their work.
     * Otherwise the logging in by a token can be broke.
     */
    removeTokenFromUrl() {
        if (this.location.path().match(tokenInUrl)) {
            // remove a token from an url to prevent unneeded sharing the token by coping an url from a browser address bar
            // we perform it only after navigation ends to prevent removing the token before route guards finish their work
            // otherwise the logging in by a token can be broke
            this.location.replaceState(this.location.path().replace(tokenInUrl, ''));
        }
    }
}
