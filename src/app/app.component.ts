import { Component, OnInit, Renderer2 } from '@angular/core';
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
                protected renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.appStore.select('userInfo').pipe(filter(info => Boolean(info)))
            .subscribe((userInfo: AggregatedUserInfo) => {
                if (!userInfo.isAdmin()) {
                    this.enableAutopilot();
                    this.configureGoogleAnalytics(userInfo);
                    this.runCountrySpecificCode(userInfo);
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

    protected runCountrySpecificCode(userInfo: AggregatedUserInfo) {
        this.appStore.select('currentStore').pipe(
            filter(store => Boolean(store) && typeof store.country === 'string' && store.country.toLowerCase() === 'us'),
            take(1),
        ).subscribe((store: UserStore) => {
            this.configureLivechat(store);
            this.enableFullstory(store, userInfo.email);
            this.enableAppcues(store, userInfo.email);
        });
    }

    protected configureLivechat(store: UserStore) {
        if (store && store.country && store.country.toLowerCase() === 'us') {
            this.showLivechat = true;
        }
    }

    protected enableFullstory(store: UserStore, userEmail: string) {
        if (!UserStore.storeIsNew(store)) {
            return;
        }
        LOAD_FULLSTORY(environment.FULLSTORY_ORG_ID);
        this.windowRef.nativeWindow.FS.identify(store.id, {
            displayName: store.name,
            email: userEmail,
        });
    }

    protected enableAppcues(store: UserStore, userEmail: string) {
        if (!store.feed || !store.feed.source || store.feed.source.toLowerCase() !== 'shopify') {
            return false;
        }
        const script: HTMLScriptElement = this.renderer.createElement('script');
        script.src = '//fast.appcues.com/28284.js';
        script.onload = () => {
            this.windowRef.nativeWindow.Appcues.identify(store.id, {
                name: store.name,
                email: userEmail,
                created_at: new Date(store.createdAt).getTime(),
            });
        };

        this.renderer.appendChild(document.body, script);
    }
}

