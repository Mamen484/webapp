import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import { LocaleIdService } from '../core/services/locale-id.service';
import { ChannelLanguage } from '../core/entities/channel-language.enum';
import { toPairs } from 'lodash';
import { environment } from '../../environments/environment';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'sf-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    userNameControl = new FormControl('', [Validators.required]);
    passwordControl = new FormControl('', [Validators.required]);

    error = '';
    localeId: keyof typeof ChannelLanguage;
    localizations = [];
    appUrl = environment.APP_URL;

    constructor(protected userService: UserService, protected router: Router,
                protected localeIdService: LocaleIdService) {
        this.localeId = this.localeIdService.localeId;
        this.localizations = toPairs(ChannelLanguage).filter(locale => locale[0] !== this.localeId);

    }

    ngOnInit() {
    }

    login() {
        this.error = '';
        if (this.userNameControl.hasError('required') || this.passwordControl.hasError('required')) {
            return;
        }
        this.userService.login(this.userNameControl.value, this.passwordControl.value).subscribe(
            data => this.router.navigate(['']),
            error => this.error = error.detail
        );
    }

}
