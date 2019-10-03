import { Component, OnInit, Renderer2 } from '@angular/core';
import { SflLocaleIdService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { zip } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AppcuesService } from './appcues.service';
import { AppcuesState } from './appcues-state.enum';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'sf-appcues',
    template: '',
    styles: ['']
})
export class AppcuesComponent implements OnInit {

    constructor(protected windowRef: SflWindowRefService,
                protected appStore: Store<AppState>,
                protected userService: SflUserService,
                protected appcuesService: AppcuesService,
                protected localeIdService: SflLocaleIdService,
                protected router: Router,
                protected renderer: Renderer2) {
    }

    ngOnInit() {
        this.appcuesService.getState().pipe(
            filter(state => state === AppcuesState.enabled),
            take(1),
        )
            .subscribe(() => {
                const script: HTMLScriptElement = this.renderer.createElement('script');
                console.log(script);
                script.src = '//fast.appcues.com/28284.js';
                script.onload = () => this.loadAppcues();
                this.renderer.appendChild(document.body, script);
            })
    }

    protected loadAppcues() {
        zip(
            this.appStore.select('currentStore'),
            this.userService.fetchAggregatedInfo()
        ).subscribe(([store, userInfo]) => {
            const params = <any>{
                name: store.name,
                email: userInfo.email,
                created_at: new Date(store.createdAt).getTime(),
            };
            if (this.localeIdService.localeId === 'fr') {
                params.language = 'fr';
            }
            this.windowRef.nativeWindow.Appcues.identify(store.id, params);
            // enable appcues to track spa route changes
            this.router.events
                .subscribe((event) => {
                    if (event instanceof NavigationEnd && this.windowRef.nativeWindow.Appcues) {
                        this.windowRef.nativeWindow.Appcues.page();
                    }
                });
            this.appcuesService.markLoaded();
        });
    }

}
