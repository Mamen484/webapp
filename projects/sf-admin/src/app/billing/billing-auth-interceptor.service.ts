import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SflAuthService } from 'sfl-shared/auth';
import { environment } from '../../environments/environment';

@Injectable()
export class BillingAuthInterceptor implements HttpInterceptor {

    constructor(protected authService: SflAuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.formatRequest(req));
    }

    protected formatRequest(req) {
        if (this.notApiCall(req)) {
            return req;
        }

        if (this.notLoggedIn()) {
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

    protected notApiCall(req) {
        return req.url.indexOf(environment.SFA_BILLING_API) !== 0;
    }

    protected notLoggedIn() {
        return (!this.authService.isLoggedIn());
    }
}
