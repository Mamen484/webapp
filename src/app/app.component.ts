import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

const TOKEN_IN_URL = /token=[a-zA-Z0-9]*&?/;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    constructor(protected router: Router,
                protected location: Location) {
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
    }

}

