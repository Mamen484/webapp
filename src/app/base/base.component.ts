import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { environment } from '../../environments/environment'

declare const Autopilot;

@Component({
    selector: 'app-homepage',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {

    constructor(protected appStore: Store<AppState>, @Inject('windowObject') protected window: any) {
        this.appStore.select('userInfo')
            .combineLatest(this.appStore.select('currentStore'))
            .subscribe(([userInfo, currentStore]) => {
                if (userInfo.login === currentStore.name) {
                    this.window.Autopilot.run('associate',
                        {_simpleAssociate: true, Email: userInfo.email, FirstName: currentStore.name});
                } else {
                    this.window.Autopilot.run('associate',
                        {
                            _simpleAssociate: true,
                            Email: environment.DEFAULT_AUTOPILOT_EMAIL,
                            FirstName: environment.DEFAULT_AUTOPILOT_STORENAME,
                        });
                }
            })
    }
}
