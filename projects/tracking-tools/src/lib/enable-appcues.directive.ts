import { Directive, OnInit, Renderer2 } from '@angular/core';
import { zip } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { Store as UserStore } from 'sfl-shared/entities';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

@Directive({
    selector: '[sfEnableAppcues]'
})
export class EnableAppcuesDirective implements OnInit {

    loaded = false;

    constructor(protected windowRef: SflWindowRefService,
                protected appStore: Store<{currentStore: UserStore}>,
                protected userService: SflUserService,
                protected router: Router,
                protected renderer: Renderer2) {
    }

    ngOnInit() {
        if (this.loaded) {
            return;
        }
        this.loaded = true;
        this.userService.fetchAggregatedInfo().subscribe(userInfo => {
            if(userInfo.isAdmin()){
                return;
            }
            const script: HTMLScriptElement = this.renderer.createElement('script');
            script.src = '//fast.appcues.com/28284.js';
            script.onload = () => this.loadAppcues(userInfo);
            this.renderer.appendChild(document.body, script);
        })

    }

    protected loadAppcues(userInfo) {

            this.appStore.select('currentStore').pipe(filter(store => Boolean(store))).subscribe((store) => {
            const params = <any>{
                name: store.name,
                email: userInfo.email,
                created_at: new Date(store.createdAt).getTime(),
                country: store.country,
                feed_source: store.feed.source,
            };
            this.windowRef.nativeWindow.Appcues.identify(store.id, params);
            // enable appcues to track spa route changes
            this.router.events
                .subscribe((event) => {
                    if (event instanceof NavigationEnd && this.windowRef.nativeWindow.Appcues) {
                        this.windowRef.nativeWindow.Appcues.page();
                    }
                });
        });
    }

}
