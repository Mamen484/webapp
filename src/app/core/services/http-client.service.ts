import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
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
            error => {
                if (retries > 0) {
                    setTimeout(() => this.tryData(observer, args, --retries), this.retryInterval);
                } else {
                    let config: MatSnackBarConfig = {};
                    if (args[0].slice(-3) === '/me') {
                        config.extraClasses = ['app-failed-error'];
                    }
                    this.snackBar.openFromComponent(ServerErrorComponent, config);
                }
            });
    }
}
