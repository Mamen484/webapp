import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { environment } from '../../environments/environment'
import { WindowRefService } from '../core/services/window-ref.service';

declare const Autopilot;

@Component({
    selector: 'app-homepage',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {

    constructor(protected appStore: Store<AppState>, protected windowRef: WindowRefService) {
        this.appStore.select('userInfo')
            .combineLatest(this.appStore.select('currentStore'))
            .subscribe(([userInfo, currentStore]) => {
                if (!environment.RUN_AUTOPILOT || <any>environment.RUN_AUTOPILOT === 'false') {
                    return;
                }
                if (userInfo.login === currentStore.name) {
                    (<any>this.windowRef.nativeWindow).Autopilot.run('associate',
                        {_simpleAssociate: true, Email: userInfo.email, FirstName: currentStore.name});
                } else {
                    (<any>this.windowRef.nativeWindow).Autopilot.run('associate',
                        {
                            _simpleAssociate: true,
                            Email: environment.DEFAULT_AUTOPILOT_EMAIL,
                            FirstName: environment.DEFAULT_AUTOPILOT_STORENAME,
                        });
                }
            })
    }
}
