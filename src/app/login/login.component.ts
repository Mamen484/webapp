import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import { toPairs } from 'lodash';
import { FormControl, Validators } from '@angular/forms';
import { WindowRefService } from '../core/services/window-ref.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'sf-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    userNameControl = new FormControl('', [Validators.required]);
    passwordControl = new FormControl('', [Validators.required]);

    error = '';

    constructor(protected userService: UserService, protected router: Router, protected windowRef: WindowRefService) {

    }

    ngOnInit() {
    }

    login() {
        this.error = '';
        if (this.userNameControl.hasError('required') || this.passwordControl.hasError('required')) {
            return;
        }
        this.userService.login(this.userNameControl.value, this.passwordControl.value).subscribe(
            data => this.windowRef.nativeWindow.location.href = environment.APP_URL + '?token=' + data.access_token,
            ({error}) => {
                this.error = error.detail
            }
        );
    }

}
