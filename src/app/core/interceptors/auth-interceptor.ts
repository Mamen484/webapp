import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor( protected localStorage: LocalStorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header only to API calls
        if (req.url.indexOf(environment.API_URL) !== 0) {
            return next.handle(req);
        }

        // add app token when needed
        if (
            (req.url.indexOf(environment.API_URL + '/shopify/auth') === 0 && req.method === 'GET')
            || (req.url.indexOf(environment.API_URL + '/shopify/store') === 0 && req.method === 'GET')
            || (req.url.indexOf(environment.API_URL + '/store') === 0 &&  (req.method === 'POST' || req.method === 'PATCH'))
        ) {
            return next.handle(req.clone({
                headers: req.headers
                    .set('Accept', 'application/json')
                    .set('Authorization', environment.APP_AUTHORIZATION)
            }))
        }

        let authString = this.localStorage.getItem('Authorization');
        if (!authString || req.url.indexOf(environment.API_URL + '/auth') === 0 /* login resource */) {
            return next.handle(req.clone({
                headers: req.headers
                    .set('Accept', 'application/json')
            }));
        }

        // Clone the request to add the new header
        // and Pass on the cloned request instead of the original request..
        return next.handle(req.clone({
            headers: req.headers
                .set('Accept', 'application/json')
                .set('Authorization', authString)
        }));
    }
}
