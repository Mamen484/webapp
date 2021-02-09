import { Directive, Inject, OnInit, Optional, Renderer2 } from '@angular/core';
import { GA_MEASUREMENT_ID } from './variables';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
    selector: '[sfcEnableGoogleAnalytics]'
})
export class EnableGoogleAnalyticsDirective implements OnInit {

    constructor(@Optional() @Inject(GA_MEASUREMENT_ID) public id: string,
                private windowRef: SflWindowRefService,
                private userService: SflUserService,
                private router: Router,
                private renderer: Renderer2) {
    }

    ngOnInit() {
        if (!this.id) {
            console.error(
                'sfc-tracking-tools: To use enable-google-analytics you must provide GA_MEASUREMENT_ID when importing TrackingToolsModule'
            );
            return;
        }
        this.loadGa();
    }

    loadGa() {
        this.userService.fetchAggregatedInfo().subscribe(userInfo => {
            if (userInfo.isAdmin()) {
                return;
            }
            this.prepareGTag();
            const script = this.createScript();
            script.onload = () => this.trackPage(userInfo);
            this.renderer.appendChild(document.body, script);
        });
    }

    private prepareGTag() {
        const window = this.windowRef.nativeWindow;
        window.dataLayer = window.dataLayer || [];
        window.gtag = (...args) => {
            window.dataLayer.push(args);
        }
        window.gtag('js', new Date());
    }

    private createScript() {
        const script: HTMLScriptElement = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.id;
        return script;
    }

    private trackPage(userInfo) {
        this.windowRef.nativeWindow.gtag('config', this.id, {
            'user_id': userInfo.token,
        });
        if (this.router.events) {
            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.windowRef.nativeWindow.gtag('config', this.id,
                        {'page_path': event.urlAfterRedirects}
                    );
                }
            });
        }
    }


}
