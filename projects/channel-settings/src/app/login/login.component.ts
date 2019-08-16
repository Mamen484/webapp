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
                this.userService.fetchAggregatedInfo().subscribe(userData => {
                    // TODO: uncomment when backend is ready
                    // if (!userData._embedded.channel.id) {
                    //     this.authService.logout();
                    //     return;
                    // }
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
