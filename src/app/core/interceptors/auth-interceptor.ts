import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { WindowRefService } from '../services/window-ref.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(protected windowRef: WindowRefService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header only to API calls
        if (req.url.indexOf(environment.API_URL) !== 0) {
            return next.handle(req);
        }

        let authString = this.windowRef.nativeWindow.localStorage.getItem('Authorization');
        if (!authString) {
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
