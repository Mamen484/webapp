import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SFL_API, SFL_APP_TOKEN } from 'sfl-shared/src/lib/core/entities';
import { SflAuthService } from 'sfl-shared/src/lib/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(protected authService: SflAuthService,
                @Inject(SFL_API) protected apiUrl,
                @Inject(SFL_APP_TOKEN) protected appToken) {
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
                    .set('Authorization', this.appToken)
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
                .set('Authorization', this.authService.getAuthString())
        });
    }

    protected appTokenNeeded(req) {
        return (req.url.indexOf(this.apiUrl + '/shopify/auth') === 0 && req.method === 'GET')
            || (req.url.indexOf(this.apiUrl + '/shopify/store') === 0 && req.method === 'GET')
            || (req.url.indexOf(this.apiUrl + '/store') === 0
                && (req.method === 'POST' || req.method === 'PATCH')
                && req.url.indexOf('/order') === -1)
    }

    protected notApiCall(req) {
        return req.url.indexOf(this.apiUrl) !== 0;
    }

    protected notLoggedIn(req) {
        return (!this.authService.isLoggedIn() || req.url.indexOf(this.apiUrl + '/auth') === 0);
    }
}
