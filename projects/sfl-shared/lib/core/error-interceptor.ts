import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Redirects a user to the login page, when any call to API returns 401 error.
 * Automatically injected to your app when you import SflShared.forRoot().
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(protected router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if (err instanceof HttpErrorResponse && err.status === 401 && !this.router.isActive('/login', false)) {
                this.router.navigate(['/login']);
            }
            return throwError(err);
        }));

    }

}
