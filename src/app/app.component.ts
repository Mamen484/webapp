import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { LOAD_AUTOPILOT } from '../autopilot';
import { Store } from '@ngrx/store';
import { AppState } from './core/entities/app-state';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AggregatedUserInfo } from './core/entities/aggregated-user-info';

declare const gtag: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    showLivechat = false;
    livechatId = environment.LIVECHAT_LICENSE_ID;

    constructor(protected appStore: Store<AppState>, protected router: Router) {
    }

    ngOnInit(): void {
        this.appStore.select('userInfo').pipe(filter(info => Boolean(info)))
            .subscribe((userInfo: AggregatedUserInfo) => {
                if (!userInfo.isAdmin()) {
                    this.enableAutopilot();
                    this.configureGoogleAnalytics(userInfo);
                    this.showLivechat = true;
                }
            });
    }

    protected configureGoogleAnalytics(userInfo) {
        gtag('config', environment.GTAG_ID, {
            'user_id': userInfo.token,
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', 'GA_TRACKING_ID', {'page_path': event.urlAfterRedirects});
            }
        });
    }

    protected enableAutopilot() {
        if (environment.RUN_AUTOPILOT && <any>environment.RUN_AUTOPILOT !== 'false') {
            LOAD_AUTOPILOT();
        }
    }
}
