import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { environment } from '../../environments/environment'
import { SflLocaleIdService, SflUserService, SflWindowRefService, StoreService } from 'sfl-shared/services';
import { AggregatedUserInfo, ChannelsRequestParams, Store as UserStore } from 'sfl-shared/entities';
import { SET_CHANNELS } from '../core/reducers/installed-channels-reducer';
import { SET_TAGS } from '../core/reducers/tags-reducer';
import { filter, flatMap, map, take } from 'rxjs/operators';
import { TagsService } from '../core/services/tags.service';
import { NavigationEnd, Router } from '@angular/router';
import { LOAD_AUTOPILOT } from '../../trackers/autopilot';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { FullstoryLoaderService } from '../core/services/fullstory-loader.service';
import { AppcuesService } from './appcues/appcues.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

    constructor(protected appStore: Store<AppState>,
                protected windowRef: SflWindowRefService,
                protected storeService: StoreService,
                protected tagsService: TagsService,
                protected userService: SflUserService,
                protected renderer: Renderer2,
                protected router: Router,
                protected zendeskService: ngxZendeskWebwidgetService,
                protected localeIdService: SflLocaleIdService,
                protected fullstoryLoader: FullstoryLoaderService,
                protected appcuesService: AppcuesService) {

        this.appStore.select('currentStore').pipe(
            flatMap(store => this.storeService.getStoreChannels(store.id, new ChannelsRequestParams(true))),
            map(({_embedded}) => _embedded.channel)
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
        this.configureZendesk();
        this.userService.fetchAggregatedInfo()
            .subscribe((userInfo) => {
                if (!userInfo.isAdmin()) {
                    this.enableAutopilot();
                    this.configureGoogleAnalytics(userInfo);
                    this.runCountrySpecificCode(userInfo);
                    this.configureAutopilot(userInfo);
                    this.enableAppcues();
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
            this.enableFullstory(store, userInfo.email);
        });
    }

    protected enableFullstory(store: UserStore, userEmail: string) {
        if (!UserStore.storeIsNew(store)) {
            return;
        }
        this.fullstoryLoader.load();
    }

    protected enableAppcues() {
        this.appcuesService.enable();
    }

    protected configureZendesk() {
        this.appStore.select('currentStore').pipe(take(1)).subscribe(store => {
            if (store.permission.chat) {
                this.zendeskService.setLocale(this.localeIdService.localeId);
                this.zendeskService.setSettings({
                    webWidget: {
                        chat: {
                            title: {
                                '*': environment.zeChatTitle,
                            },
                            concierge: {
                                name: environment.zeConciergeName,
                                title: {
                                    '*': environment.zeConciergeTitle,
                                    'fr': environment.zeConciergeTitleFr,
                                }
                            },
                        },
                        contactForm: {
                            suppress: true
                        }
                    }
                });
                this.zendeskService.show();
            }
        });
    }
}
