import { Injectable, Renderer2 } from '@angular/core';
import { BehaviorSubject, zip } from 'rxjs';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AppcuesService {

    protected enabled$ = new BehaviorSubject(false);
    protected enabled = false;

    constructor(protected windowRef: SflWindowRefService,
                protected renderer: Renderer2,
                protected appStore: Store<AppState>,
                protected userService: SflUserService,
                protected router: Router) {
    }

    enable() {
        if (this.enabled) {
            return;
        }
        this.enabled = true;
        zip(
            this.appStore.select('currentStore'),
            this.userService.fetchAggregatedInfo()
        ).subscribe(([store, userInfo]) => {
            const script: HTMLScriptElement = this.renderer.createElement('script');
            script.src = '//fast.appcues.com/28284.js';
            script.onload = () => {
                this.windowRef.nativeWindow.Appcues.identify(store.id, {
                    name: store.name,
                    email: userInfo.email,
                    created_at: new Date(store.createdAt).getTime(),
                });
                this.enabled$.next(true);
                // @TODO: rethink, if should we alter the DOM from a service
                this.renderer.appendChild(document.body, script);
            };

            // enable appcues to track spa route changes
            this.router.events
                .subscribe((event) => {
                    if (event instanceof NavigationEnd && this.windowRef.nativeWindow.Appcues) {
                        this.windowRef.nativeWindow.Appcues.page();
                    }
                });
        });
    }

    getState() {
        return this.enabled$.asObservable();
    }
}
