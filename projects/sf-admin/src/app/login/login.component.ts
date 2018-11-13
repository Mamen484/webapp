import { Component, OnInit } from '@angular/core';
import { SflAuthService } from 'sfl-shared/src/lib/auth';
import { SflUserService } from 'sfl-shared/src/lib/services';
import { Router } from '@angular/router';

@Component({
    selector: 'sfa-login',
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
                this.userService.fetchAggregatedInfo().subscribe(userData => {
                    if (!userData.isAdmin()) {
                        this.authService.logout();
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
