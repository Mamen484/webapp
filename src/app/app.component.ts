import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { LOAD_AUTOPILOT } from '../autopilot';
import { Store } from '@ngrx/store';
import { AppState } from './core/entities/app-state';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { AggregatedUserInfo } from './core/entities/aggregated-user-info';

declare const gtag: any;
declare const olark: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    constructor(protected appStore: Store<AppState>, protected router: Router) {
    }

    ngOnInit(): void {
        this.configureAutopilot();
        this.configureGoogleAnalytics();
        this.configureOlark();
    }

    protected configureAutopilot() {
        if (environment.RUN_AUTOPILOT && <any>environment.RUN_AUTOPILOT !== 'false') {
            LOAD_AUTOPILOT();
        }
    }

    protected configureGoogleAnalytics() {

        this.appStore.select('userInfo').pipe(filter(info => Boolean(info)))
            .subscribe((userInfo: AggregatedUserInfo) => {
                gtag('config', environment.GTAG_ID, {
                    'user_id': userInfo.token,
                });
            });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', 'GA_TRACKING_ID', {'page_path': event.urlAfterRedirects});
            }
        });
    }

    protected configureOlark() {
        this.appStore.select('userInfo').pipe(
            take(1),
            filter(info => Boolean(info))
        ).subscribe(userInfo => {
            if (!userInfo.isAdmin()) {
                /* custom configuration goes here (www.olark.com/documentation) */
                olark.configure('system.is_single_page_application', true);
                olark.identify('3699-605-10-3654');
            }
        });

    }
}
