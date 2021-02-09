import { Directive, OnInit } from '@angular/core';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { LOAD_FACEBOOK } from './trackers/facebook';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
    selector: '[sfEnableFacebook]'
})
export class EnableFacebookDirective implements OnInit {

    constructor(private userService: SflUserService,
                private windowRef: SflWindowRefService,
                private router: Router) {
    }

    ngOnInit() {
        this.userService.fetchAggregatedInfo().subscribe(userInfo => {
            if (userInfo.isAdmin()) {
                return;
            }
            LOAD_FACEBOOK();
            const fbq = this.windowRef.nativeWindow.fbq;
            fbq('init', '1327138244065995');
            fbq('track', 'PageView');
            if (this.router.events) {
                this.router.events.subscribe(event => {
                    if (event instanceof NavigationEnd) {
                        fbq('track', 'PageView');
                    }
                });
            }
        })
    }

}

