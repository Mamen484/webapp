import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { LOAD_AUTOPILOT } from '../trackers/autopilot';
import { Store } from '@ngrx/store';
import { AppState } from './core/entities/app-state';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { AggregatedUserInfo } from './core/entities/aggregated-user-info';
import { Store as UserStore } from './core/entities/store';
import { WindowRefService } from './core/services/window-ref.service';
import { LOAD_FULLSTORY } from '../trackers/fullstory';
import { Location } from '@angular/common';

const TOKEN_IN_URL = /token=[a-zA-Z0-9]*&?/;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    showLivechat = false;
    livechatId = environment.LIVECHAT_LICENSE_ID;

    constructor(protected appStore: Store<AppState>,
                protected router: Router,
                protected windowRef: WindowRefService,
                protected location: Location) {
    }

    ngOnInit(): void {
        if (this.location.path().match(TOKEN_IN_URL)) {
            // remove a token from an url to prevent unneeded sharing the token by coping an url from a browser address bar
            this.location.replaceState(this.location.path().replace(TOKEN_IN_URL, ''));
        }
        this.appStore.select('userInfo').pipe(filter(info => Boolean(info)))
            .subscribe((userInfo: AggregatedUserInfo) => {
                if (!userInfo.isAdmin()) {
                    this.enableAutopilot();
                    this.configureGoogleAnalytics(userInfo);
                    this.configureLivechat();
                    this.enableFullstory(userInfo.email);
                }
            });
    }

    protected configureGoogleAnalytics(userInfo) {
        this.windowRef.nativeWindow.gtag('config', environment.GTAG_ID, {
            'user_id': userInfo.token,
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.windowRef.nativeWindow.gtag('config', environment.GTAG_ID,
                    {'page_path': event.urlAfterRedirects}
                );
            }
        });
    }

    protected enableAutopilot() {
        if (environment.RUN_AUTOPILOT && <any>environment.RUN_AUTOPILOT !== 'false') {
            LOAD_AUTOPILOT();
        }
    }

    protected configureLivechat() {
        this.appStore.select('currentStore').subscribe((store: UserStore) => {
            if (store && store.country && store.country.toLowerCase() === 'us') {
                this.showLivechat = true;
            }
        });
    }

    protected enableFullstory(userEmail) {
        this.appStore.select('currentStore')
            .pipe(
                filter((store: UserStore) => {
                    return store && store.country && store.country.toLowerCase() === 'us' && UserStore.storeIsNew(store)
                }),
                take(1),
            )
            .subscribe((store: UserStore) => {
                LOAD_FULLSTORY(environment.FULLSTORY_ORG_ID);
                this.windowRef.nativeWindow.FS.identify(store.id, {
                    displayName: store.name,
                    email: userEmail,
                });
            });
    }
}
