import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { SflAuthService, SflLocaleIdService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'sf-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    hasServerError = false;
    showDeletedStoreError = false;
    contactEmail;
    loadingNextPage = false;

    userNameControl = new FormControl('', []);
    passwordControl = new FormControl('', []);

    constructor(protected userService: SflUserService,
                protected authService: SflAuthService,
                protected windowRef: SflWindowRefService,
                protected localeIdService: SflLocaleIdService,
                protected titleService: Title,
                protected elementRef: ElementRef) {
        this.titleService.setTitle('Shoppingfeed / Login');
        this.contactEmail = environment.contactEmail[this.localeIdService.localeId] || environment.contactEmail.en;
    }

    ngOnInit() {
    }

    login() {
        this.hasServerError = false;
        this.loadingNextPage = true;
        this.authService.login(this.userNameControl.value, this.passwordControl.value).subscribe(
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
            () => {
                this.loadingNextPage = false;
                this.hasServerError = true;
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
