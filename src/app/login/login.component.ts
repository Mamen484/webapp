import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toPairs } from 'lodash';
import { FormControl, Validators } from '@angular/forms';
import { URLSearchParams } from '@angular/http';

import { WindowRefService } from '../core/services/window-ref.service';
import { environment } from '../../environments/environment';
import { StoreStatus } from '../core/entities/store-status.enum';
import { Store } from '../core/entities/store';
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

    constructor(protected userService: UserService,
                protected router: Router,
                protected windowRef: WindowRefService) {

    }

    ngOnInit() {
    }

    login() {
        this.error = '';
        if (this.userNameControl.hasError('required') || this.passwordControl.hasError('required')) {
            return;
        }
        this.userService.login(this.userNameControl.value, this.passwordControl.value).subscribe(
            data => {
                // TODO: refactor the code in next releases
                this.userService.fetchAggregatedInfo(true)
                    .subscribe((userData: AggregatedUserInfo) => {
                        let activeStore = this.findActiveStore(userData);
                        if (activeStore) {
                            this.windowRef.nativeWindow.location.href = this.buildUrl(
                                data.access_token,
                                activeStore.name,
                                userData.roles.indexOf('admin') !== -1
                            );
                            return;
                        }
                        this.windowRef.nativeWindow.localStorage.removeItem('Authorization');
                        this.showDeletedStoreError = true;
                    })
            },
            ({error}) => {
                this.error = error.detail
            }
        )
        ;
    }

    protected findActiveStore(userData): Store {
        return userData._embedded.store.find(store => store.status !== StoreStatus.deleted);
    }

    protected buildUrl(token, storeName, isAdmin) {
        let queryParams = new URLSearchParams();
        queryParams.set('token', token);
        queryParams.set('store', storeName);
        let additionalPath = isAdmin ? '/admin' : '';
        return environment.APP_URL + additionalPath + '?' + queryParams.toString();
    }

}
