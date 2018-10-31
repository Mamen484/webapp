import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { URLSearchParams } from '@angular/http';

import { SflWindowRefService } from 'sfl-shared';
import { environment } from '../../environments/environment';
import { UserService } from '../core/services/user.service';
import { AggregatedUserInfo } from '../core/entities/aggregated-user-info';

@Component({
    selector: 'sf-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    userNameControl = new FormControl('', [Validators.required]);
    passwordControl = new FormControl('', [Validators.required]);

    error = '';
    showDeletedStoreError = false;
    contactEmail = environment.CONTACT_EMAIL;
    loadingNextPage = false;

    constructor(protected userService: UserService,
                protected router: Router,
                protected windowRef: SflWindowRefService) {

    }

    ngOnInit() {
    }

    login() {
        this.error = '';
        if (this.userNameControl.hasError('required') || this.passwordControl.hasError('required')) {
            return;
        }
        this.loadingNextPage = true;
        this.userService.login(this.userNameControl.value, this.passwordControl.value).subscribe(
            data => {
                this.userService.fetchAggregatedInfo()
                    .subscribe((userData: AggregatedUserInfo) => {
                        let activeStore = userData.findFirstEnabledStore();
                        if (activeStore) {
                            this.windowRef.nativeWindow.location.href = this.buildUrl(
                                data.access_token,
                                activeStore.id,
                                userData.roles.indexOf('admin') !== -1 || userData.roles.indexOf('employee') !== -1
                            );
                            return;
                        }
                        this.windowRef.nativeWindow.localStorage.removeItem('Authorization');
                        this.showDeletedStoreError = true;
                    })
            },
            ({error}) => {
                // @todo: research and refactor type of error issue
                if (typeof error === 'string') {
                    error = JSON.parse(error);
                }
                this.loadingNextPage = false;
                this.error = error.detail
            }
        )
        ;
    }
    protected buildUrl(token, storeId, isAdmin) {
        let queryParams = new URLSearchParams();
        queryParams.set('token', token);
        queryParams.set('store', storeId);
        let additionalPath = isAdmin ? '/admin' : '';
        return environment.APP_URL + additionalPath + '?' + queryParams.toString();
    }

}
