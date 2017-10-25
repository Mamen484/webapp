import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';

declare const Autopilot;

@Component({
    selector: 'app-homepage',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {

    constructor(protected appStore: Store<AppState>) {
        this.appStore.select('userInfo')
            .combineLatest(this.appStore.select('currentStore'))
            .subscribe(([userInfo, currentStore]) => {
                Autopilot.run('associate',
                    {_simpleAssociate: true, Email: userInfo.email, FirstName: currentStore.name});
            })
    }
}
