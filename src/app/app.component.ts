import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PageLoadingService } from './core/services/page-loading.service';
import { SflAuthService, SflLocaleIdService } from 'sfl-shared/services';
import { Subscription, timer } from 'rxjs';

const minute = 60000;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    loadingNextRoute = true;
    keepLoggedOutSubscription: Subscription;

    constructor(protected router: Router,
                protected pageLoadingService: PageLoadingService,
                protected authService: SflAuthService) {
    }

    ngOnInit(): void {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
            this.authService.removeTokenFromUrl();
        });
        this.router.events.subscribe(routerEvent => this.checkRouterEvent(routerEvent));

        this.pageLoadingService.getState().subscribe(isBeingLoaded => this.loadingNextRoute = isBeingLoaded);
        this.keepLoggedOutSubscription = timer(minute, minute).subscribe(() => {
            if (this.authService.isLoggedIn()) {
                this.authService.updateTokenExpiry();
            }
        });
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

