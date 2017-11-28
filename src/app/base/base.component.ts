import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { environment } from '../../environments/environment'
import { WindowRefService } from '../core/services/window-ref.service';
import { SET_STORE, UPDATE_TIMELINE } from '../core/reducers/current-store-reducer';
import { INITIALIZE_USER_INFO } from '../core/reducers/user-info-reducer';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../core/services/user.service';

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
