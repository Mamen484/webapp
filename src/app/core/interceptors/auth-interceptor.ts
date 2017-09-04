import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header only to API calls
        if (req.url.indexOf(environment.API_URL) !== 0) {
            return next.handle(req);
        }
        // Clone the request to add the new header.
        const authReq = req.clone({
            headers: req.headers
                .set('Accept', 'application/json')
                .set('Authorization', environment.DEFAULT_AUTHORIZATION)
        });
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }
}
