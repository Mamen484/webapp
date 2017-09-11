import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

const PROGRESS_UPDATE_FREQUENCY = 100; // ms
const PERCENTS = 100;

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
    public progress = 0;
    public registrationFinished = false;
    public appUrl = environment.APP_URL;

    public ngOnInit() {
        localStorage.removeItem('sf.registration');
        this.showProgress();
    }

    protected showProgress() {
        Observable.interval(PROGRESS_UPDATE_FREQUENCY).take(PERCENTS).subscribe(
            () => this.progress += 1,
            () => {},
            () => this.onFinish()
        )
    }

    protected onFinish() {
        // query params are passed to shopping feed to auto connect the user
        this.registrationFinished = true;
    }
}
