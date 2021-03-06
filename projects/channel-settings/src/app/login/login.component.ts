import { Component, OnInit } from '@angular/core';
import { SflAuthService, SflUserService } from 'sfl-shared/services';
import { Router } from '@angular/router';

@Component({
    selector: 'sfcs-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    error = '';
    loadingNextPage = false;

    constructor(protected userService: SflUserService,
                protected authService: SflAuthService,
                protected router: Router) {

    }

    ngOnInit() {
    }

    login({username, password}) {
        this.error = '';
        this.loadingNextPage = true;
        this.authService.login(username, password).subscribe(
            data => {
                this.userService.fetchAggregatedInfo(true).subscribe(userData => {
                    if (!userData._embedded.channel) {
                        this.authService.logout();
                        this.loadingNextPage = false;
                        this.error = 'We could not find your account';
                        return;
                    }
                    this.router.navigate(['/']);
                })
            },
            ({error}) => {
                this.loadingNextPage = false;
                this.error = error.detail
            }
        );
    }

}
