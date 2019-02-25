import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { PageLoadingService } from './core/services/page-loading.service';

const TOKEN_IN_URL = /token=[a-zA-Z0-9]*&?/;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    loadingNextRoute = true;

    constructor(protected router: Router,
                protected location: Location,
                protected pageLoadingService: PageLoadingService) {
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
        this.router.events.subscribe(routerEvent => this.checkRouterEvent(routerEvent));

        this.pageLoadingService.getState().subscribe(isBeingLoaded => this.loadingNextRoute = isBeingLoaded);
    }

    /**
     * Show a progressbar in the top of the application when we're loading the next route
     */
    protected checkRouterEvent(routerEvent: Event) {
        if (routerEvent instanceof NavigationStart) {
            this.pageLoadingService.startLoading();
        }
        if (routerEvent instanceof NavigationEnd
            || routerEvent instanceof NavigationCancel
            || routerEvent instanceof NavigationError) {
            this.pageLoadingService.finishLoading();
        }
    }

}

