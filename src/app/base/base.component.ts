import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { environment } from '../../environments/environment'
import { SflUserService, SflWindowRefService, StoreService } from 'sfl-shared/services';
import { AggregatedUserInfo, ChannelsRequestParams, Store as UserStore } from 'sfl-shared/entities';
import { SET_CHANNELS } from '../core/reducers/installed-channels-reducer';
import { SET_TAGS } from '../core/reducers/tags-reducer';
import { filter, flatMap, map, take } from 'rxjs/operators';
import { TagsService } from '../core/services/tags.service';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LOAD_AUTOPILOT } from '../../trackers/autopilot';
import { LOAD_FULLSTORY } from '../../trackers/fullstory';

@Component({
    selector: 'app-homepage',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

    showLivechat = false;
    livechatId = environment.LIVECHAT_LICENSE_ID;

    constructor(protected appStore: Store<AppState>,
                protected windowRef: SflWindowRefService,
                protected storeService: StoreService,
                protected tagsService: TagsService,
                protected userService: SflUserService,
                protected renderer: Renderer2,
                protected router: Router) {

        this.appStore.select('currentStore').pipe(
            flatMap(store => this.storeService.getStoreChannels(store.id, new ChannelsRequestParams(true))),
            map(({_embedded}) => _embedded.channel.map(({_embedded: {channel}}) => channel))
        )
            .subscribe(channels => {
                this.appStore.dispatch({type: SET_CHANNELS, channels})
            });
        this.appStore.select('currentStore').pipe(
            flatMap(store => this.tagsService.fetchAll(store.id))
        )
            .subscribe(response => {
                this.appStore.dispatch({type: SET_TAGS, tags: response._embedded.tag});
            });
    }

    ngOnInit() {
        this.userService.fetchAggregatedInfo()
            .subscribe((userInfo) => {
                if (!userInfo.isAdmin()) {
                    this.enableAutopilot();
                    this.configureGoogleAnalytics(userInfo);
                    this.runCountrySpecificCode(userInfo);
                    this.configureAutopilot(userInfo);
                }
            });
    }


    protected configureAutopilot(userInfo) {
        this.appStore.select('currentStore')
            .subscribe((currentStore) => {
                if (!environment.RUN_AUTOPILOT || <any>environment.RUN_AUTOPILOT === 'false') {
                    return;
                }
                this.windowRef.nativeWindow.Autopilot.run('associate', this.getDataForAssociate(userInfo, currentStore));
            });
    }

    protected getDataForAssociate(info: AggregatedUserInfo, store: UserStore) {
        return info.login === store.name
            ? {_simpleAssociate: true, Email: info.email, FirstName: store.name}
            : {
                _simpleAssociate: true,
                Email: environment.DEFAULT_AUTOPILOT_EMAIL,
                FirstName: environment.DEFAULT_AUTOPILOT_STORENAME,
            };

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
            this.configureLivechat(store, userInfo.email);
            this.enableFullstory(store, userInfo.email);
            this.enableAppcues(store, userInfo.email);
        });
    }

    protected configureLivechat(store: UserStore, userEmail: string) {
        this.showLivechat = true;
        // this code needs to run after liveChat is enabled, with the next change detection run
        setTimeout(() => {
            if (typeof this.windowRef.nativeWindow.__lc === 'object') {
                this.windowRef.nativeWindow.__lc.visitor = {
                    email: userEmail,
                    name: store.name,
                };
            }
        });
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
