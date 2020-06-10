import { Component, OnInit } from '@angular/core';
import { SflAuthService, SflLocaleIdService } from 'sfl-shared/services';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'sf-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    error = '';
    showDeletedStoreError = false;
    contactEmail;
    loadingNextPage = false;

    constructor(protected userService: SflUserService,
                protected authService: SflAuthService,
                protected windowRef: SflWindowRefService,
                protected localeIdService: SflLocaleIdService,
                protected titleService: Title) {
        this.titleService.setTitle('Shoppingfeed / Login');
        this.contactEmail = environment.contactEmail[this.localeIdService.localeId] || environment.contactEmail.en;
    }

    ngOnInit() {
    }

    login({username, password}) {
        this.error = '';
        this.loadingNextPage = true;
        this.authService.login(username, password).subscribe(
            data => {
                this.userService.fetchAggregatedInfo(true)
                    .subscribe(userData => {
                        let activeStore = userData.findFirstEnabledStore();
                        if (activeStore) {
                            this.windowRef.nativeWindow.location.href = this.buildUrl(
                                data.access_token,
                                activeStore.id,
                                userData.isAdmin()
                            );
                            return;
                        }
                        this.authService.logout();
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
        let queryParams = new HttpParams()
            .set('token', token)
            .set('store', storeId);
        let additionalPath = isAdmin ? '/admin' : '';
        return environment.APP_URL + additionalPath + '?' + queryParams.toString();
    }

}
