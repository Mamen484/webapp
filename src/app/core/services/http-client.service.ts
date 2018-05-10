import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { Observable ,  Observer } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ServerErrorComponent } from '../../snackbars/server-error/server-error.component';

const RETRY_INTERVAL = 3000;
const RETRIES_NUMBER = 2;

@Injectable()
export class HttpClientService extends HttpClient {

    retryInterval = RETRY_INTERVAL;

    constructor(handler: HttpHandler, protected snackBar: MatSnackBar) {
        super(handler);
    }

    get<T>(...args): Observable<T> {
        return Observable.create(o => this.tryData(o, args, RETRIES_NUMBER));
    }

    protected applyData(observer, data) {
        observer.next(data);
        observer.complete();
    }

    protected tryData(observer: Observer<any>, args: any[], retries: number) {
        super.get.apply(this, args).subscribe(
            data => this.applyData(observer, data),
            (error: HttpErrorResponse) => {
                if (error.status < 500) {
                    observer.error(error);
                    return;
                }
                if (retries > 0) {
                    setTimeout(() => this.tryData(observer, args, --retries), this.retryInterval);
                } else {
                    if (args[0].slice(-3) !== '/me') {
                        this.snackBar.openFromComponent(ServerErrorComponent);
                    }
                    if (error instanceof HttpErrorResponse) {
                        observer.error(error);
                    }

                }
            });
    }
}
