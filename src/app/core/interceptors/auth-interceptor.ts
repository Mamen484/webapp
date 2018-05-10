import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(protected localStorage: LocalStorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.formatRequest(req));
    }

    protected formatRequest(req) {
        if (this.notApiCall(req)) {
            return req;
        }
        if (this.appTokenNeeded(req)) {
            return req.clone({
                headers: req.headers
                    .set('Accept', 'application/json')
                    .set('Authorization', environment.APP_AUTHORIZATION)
            })
        }
        if (this.notLoggedIn(req)) {
            return req.clone({
                headers: req.headers.set('Accept', 'application/json')
            });
        }

        // Clone the request to add the new header
        // and Pass on the cloned request instead of the original request..
        return req.clone({
            headers: req.headers
                .set('Accept', 'application/json')
                .set('Authorization', this.localStorage.getItem('Authorization'))
        });
    }

    protected appTokenNeeded(req) {
        return (req.url.indexOf(environment.API_URL + '/shopify/auth') === 0 && req.method === 'GET')
            || (req.url.indexOf(environment.API_URL + '/shopify/store') === 0 && req.method === 'GET')
            || (req.url.indexOf(environment.API_URL + '/store') === 0
                && (req.method === 'POST' || req.method === 'PATCH')
                && req.url.indexOf('/order') === -1)
    }

    protected notApiCall(req) {
        return req.url.indexOf(environment.API_URL) !== 0;
    }

    protected notLoggedIn(req) {
        let authString = this.localStorage.getItem('Authorization');
        return (!authString || req.url.indexOf(environment.API_URL + '/auth') === 0);
    }
}
