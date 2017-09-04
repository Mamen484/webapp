import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

const PROGRESS_UPDATE_FREQUENCY = 100; // ms
const PERCENTS = 100;

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
    private queryParam: object;
    public progress = 0;

    constructor(private route: ActivatedRoute,) {
    }

    public ngOnInit() {
        console.log('create account');
        localStorage.removeItem('sf.path.initial');
        this.route.queryParams.subscribe((params: Params) => {
            this.queryParam = params
        });
        this.showProgress();
    }

    protected showProgress() {
        Observable.interval(PROGRESS_UPDATE_FREQUENCY).take(PERCENTS).subscribe(
            () =>
                this.progress += 1,
            () => {
            },
            () => this.onFinish()
        )
    }

    protected onFinish() {
        // query params are passed to shopping feed to auto connect the user
        let url = environment.APP_URL + '?';

        for (let param in this.queryParam as any) {
            if (this.queryParam.hasOwnProperty(param)) {
                url += param + '=' + this.queryParam[param] + '&';
            }
        }

        window.location.href = url;
    }
}
