import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { LocalStorageService } from '../../core/services/local-storage.service';

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
    public updateFrequency = PROGRESS_UPDATE_FREQUENCY;

    constructor(protected localStorage: LocalStorageService) {
    }

    public ngOnInit() {
        this.localStorage.removeItem('sf.registration');
        this.showProgress();
    }

    protected showProgress() {
        interval(this.updateFrequency).pipe(take(PERCENTS)).subscribe(
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
