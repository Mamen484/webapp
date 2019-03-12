import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { SflAuthService } from 'sfl-shared/services';

@Component({
    selector: 'sfa-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(protected router: Router,
                protected authService: SflAuthService) {
    }

    ngOnInit() {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
            this.authService.removeTokenFromUrl();
        });
    }
}
