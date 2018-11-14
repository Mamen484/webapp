import { Inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SFL_LEGACY_LINK } from 'sfl-shared/entities';
import { SflAuthService } from './auth.service';
import { query } from '@angular/animations';

@Injectable({
    providedIn: 'root'
})
export class SflLegacyLinkService {

    constructor(protected authService: SflAuthService, @Inject(SFL_LEGACY_LINK) protected appLink) {
    }

    getLegacyLink(path, params = {}, addAuthorization = true) {
        let queryParams = new HttpParams();
        for (let param in params) {
            if (params.hasOwnProperty(param) && params[param]) {
                queryParams = queryParams.set(param, String(params[param]));
            }
        }
        if (addAuthorization) {
            const token = this.authService.getAuthToken();
            if (token) {
                queryParams = queryParams.set('token', token);
            }
        }

        const paramsString = queryParams.toString();

        return paramsString
            ? this.appLink + path + '?' + paramsString
            : this.appLink + path;
    }

}
