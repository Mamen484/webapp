import { Directive, OnInit } from '@angular/core';
import { loadSalesMachine } from './trackers/salesmachine';
import { NavigationEnd, Router } from '@angular/router';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { Store as UserStore } from 'sfl-shared/entities';

@Directive({
    selector: '[sfEnableSalesMachine]'
})
export class EnableSalesMachineDirective implements OnInit {

    testing = false;

    constructor(protected windowRef: SflWindowRefService,
                protected appStore: Store<{currentStore: UserStore}>,
                protected userService: SflUserService,
                protected router: Router,) {
    }

    ngOnInit() {
        this.userService.fetchAggregatedInfo()
            .subscribe((userInfo) => {
                if (!userInfo.isAdmin()) {
                    this.runSalesMachine(userInfo);
                }
            });
    }

    protected runSalesMachine(userInfo) {
        if (this.testing) {
            return false;
        }
        loadSalesMachine(() => {
            this.appStore.select('currentStore').subscribe(store => {
                this.sendSalesMachineTrackEvent(userInfo, store);
                this.router.events.subscribe(event => {
                    if (event instanceof NavigationEnd) {
                        this.sendSalesMachineTrackEvent(userInfo, store);
                    }
                });
            })
        });
    }

    protected sendSalesMachineTrackEvent(userInfo, store) {
        this.windowRef.nativeWindow.salesmachine.track(userInfo.email, 'pageview', {
            account_uid: store.id,
        });
    }

}
