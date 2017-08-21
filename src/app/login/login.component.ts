import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import { LocaleIdService } from '../core/services/locale-id.service';
import { ChannelLanguage } from '../core/entities/channel-language.enum';
import { toPairs } from 'lodash';
import { environment } from '../../environments/environment';

@Component({
    selector: 'sf-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username = '';
    password = '';
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
        this.userService.login(this.username, this.password).subscribe(
            data => this.router.navigate(['']),
            error => this.error = error.detail
        );
    }

}
