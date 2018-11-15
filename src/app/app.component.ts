import { Component, OnInit, Renderer2 } from '@angular/core';
import { environment } from '../environments/environment';
import { LOAD_AUTOPILOT } from '../trackers/autopilot';
import { Store } from '@ngrx/store';
import { AppState } from './core/entities/app-state';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { Store as UserStore } from 'sfl-shared/entities';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
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
                protected windowRef: SflWindowRefService,
                protected location: Location,
                protected renderer: Renderer2,
                protected userService: SflUserService) {
    }

    ngOnInit(): void {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
            if (this.location.path().match(TOKEN_IN_URL)) {
                // remove a token from an url to prevent unneeded sharing the token by coping an url from a browser address bar
                // we perform it only after navigation ends to prevent removing the token before route guards finish their work
                // otherwise the logging in by a token can be broke
                this.location.replaceState(this.location.path().replace(TOKEN_IN_URL, ''));
            }
        });

        this.userService.fetchAggregatedInfo()
            .subscribe((userInfo) => {
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

    protected runCountrySpecificCode(userInfo) {
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

