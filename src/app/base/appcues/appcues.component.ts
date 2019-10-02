import { Component, OnInit } from '@angular/core';
import { SflLocaleIdService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { zip } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppcuesService } from './appcues.service';
import { AppcuesState } from './appcues-state.enum';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'sf-appcues',
    templateUrl: './appcues.component.html',
    styleUrls: ['./appcues.component.scss']
})
export class AppcuesComponent implements OnInit {

    appcuesEnabled = false;

    constructor(protected windowRef: SflWindowRefService,
                protected appStore: Store<AppState>,
                protected userService: SflUserService,
                protected appcuesService: AppcuesService,
                protected localeIdService: SflLocaleIdService,
                protected router: Router) {
    }

    ngOnInit() {
        this.appcuesService.getState().pipe(filter(state => state === AppcuesState.enabled))
            .subscribe(() => this.appcuesEnabled = true);
    }

    loaded() {
        zip(
            this.appStore.select('currentStore'),
            this.userService.fetchAggregatedInfo()
        ).subscribe(([store, userInfo]) => {
            const params = <any>{
                name: store.name,
                email: userInfo.email,
                created_at: new Date(store.createdAt).getTime(),
            };
            if (this.localeIdService.localeId === 'fr') {
                params.language = 'fr';
            }
            this.windowRef.nativeWindow.Appcues.identify(store.id, params);
            // enable appcues to track spa route changes
            this.router.events
                .subscribe((event) => {
                    if (event instanceof NavigationEnd && this.windowRef.nativeWindow.Appcues) {
                        this.windowRef.nativeWindow.Appcues.page();
                    }
                });
            this.appcuesService.markLoaded();
        });
    }

}
