import { Directive, Inject, OnInit, Optional, Renderer2 } from '@angular/core';
import { GTM_ID } from './variables';
import { SflLocaleIdService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { NavigationEnd, Router } from '@angular/router';
import { AggregatedUserInfo, Store as UserStore } from 'sfl-shared/entities';
import { Store } from '@ngrx/store';
import { zip } from 'rxjs';
import { filter } from 'rxjs/operators';


const day = 1000 * 60 * 60 * 24;

@Directive({
    selector: '[sfcEnableGoogleTagsManagement]'
})
export class EnableGoogleTagsManagementDirective implements OnInit {

    constructor(@Optional() @Inject(GTM_ID) public id: string,
                private windowRef: SflWindowRefService,
                private userService: SflUserService,
                private router: Router,
                private renderer: Renderer2,
                private localeIdService: SflLocaleIdService,
                private appStore: Store<{ currentStore: UserStore }>) {
    }

    ngOnInit() {
        if (!this.id) {
            console.error(
                'sfc-tracking-tools: To use enable-google-tags-management you must provide GA_MEASUREMENT_ID when importing TrackingToolsModule'
            );
            return;
        }
        this.loadGa();
    }

    loadGa() {
        zip(
            this.userService.fetchAggregatedInfo(),
            this.appStore.select('currentStore').pipe(filter(store => Boolean(store)))
        )
            .subscribe(([userInfo, storeData]) => {
                this.prepareGTag(userInfo, storeData);
                const script = this.createScript();
                script.onload = () => this.trackPage();
                this.renderer.appendChild(document.body, script);
            });
    }

    private prepareGTag(userInfo: AggregatedUserInfo, storeData: UserStore) {
        const window = this.windowRef.nativeWindow;
        window.dataLayer = window.dataLayer || [{
            'Email': userInfo.email,
            'Id': storeData.id,
            'Name': storeData.name,
            'Role': userInfo.roles[0],
            'Country': storeData.country,
            'CreatedAt': storeData.createdAt,
            'CreatedSince': Math.floor((Date.now() - Date.parse(storeData.createdAt)) / day),
            'FeedType': storeData.feed.source,
            'ChatEnabled': Boolean(storeData.permission?.chat),
            'Locale': this.localeIdService.localeId,

        }];
        window.dataLayer.push({
            'gtm.start':
                new Date().getTime(), event: 'gtm.js'
        });
        window.dataLayer.push({'event': 'ShoppingfeedView'});
    }

    private createScript() {
        const script: HTMLScriptElement = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtm.js?id=' + this.id;
        return script;
    }

    private trackPage() {
        if (this.router.events) {
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.windowRef.nativeWindow.dataLayer.push({'event': 'ShoppingfeedView'});
                }
            });
        }
    }
}
