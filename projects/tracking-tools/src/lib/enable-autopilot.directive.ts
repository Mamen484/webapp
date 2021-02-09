import { Directive, Inject, OnInit } from '@angular/core';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { LOAD_AUTOPILOT } from './trackers/autopilot';
import { AggregatedUserInfo, Store as UserStore } from 'sfl-shared/entities';
import { Store } from '@ngrx/store';
import { DEFAULT_AUTOPILOT_EMAIL, DEFAULT_AUTOPILOT_STORENAME } from './variables';

@Directive({
    selector: '[sfEnableAutopilot]'
})
export class EnableAutopilotDirective implements OnInit {

    constructor(private userService: SflUserService,
                private windowRef: SflWindowRefService,
                private store: Store<{ currentStore: UserStore }>,
                @Inject(DEFAULT_AUTOPILOT_EMAIL) private defaultEmail,
                @Inject(DEFAULT_AUTOPILOT_STORENAME) private defaultStoreName,
    ) {
    }

    ngOnInit() {
        this.userService.fetchAggregatedInfo().subscribe(userInfo => {
            if (!userInfo.isAdmin()) {
                LOAD_AUTOPILOT();

                this.store.select('currentStore').subscribe(currentStore => {
                    this.windowRef.nativeWindow.addEventListener('onload', () => {
                        this.windowRef.nativeWindow.Autopilot.run('associate', this.getDataForAssociate(userInfo, currentStore));
                    });
                });

            }
        });
    }

    private getDataForAssociate(info: AggregatedUserInfo, store: UserStore) {
        console.log(this.defaultStoreName, this.defaultEmail);
        return info.login === store.name
            ? {_simpleAssociate: true, Email: info.email, FirstName: store.name}
            : {
                _simpleAssociate: true,
                Email: this.defaultEmail,
                FirstName: this.defaultStoreName,
            };

    }

}
