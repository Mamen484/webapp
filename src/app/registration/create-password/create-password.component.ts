import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopifyAuthentifyService } from '../../core/services/shopify-authentify.service';
import { environment } from '../../../environments/environment';
import { SflAuthService, SflLocaleIdService, StoreService } from 'sfl-shared/services';
import { Store } from 'sfl-shared/entities';

@Component({
    selector: 'app-create-password',
    templateUrl: './create-password.component.html',
    styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

    public supportEmail;
    public displayServerError = false;

    protected store;

    constructor(protected storeService: StoreService,
                protected router: Router,
                protected route: ActivatedRoute,
                protected shopifyService: ShopifyAuthentifyService,
                protected authService: SflAuthService,
                protected localeIdService: SflLocaleIdService) {
        this.supportEmail = environment.supportEmail[this.localeIdService.localeId] || environment.supportEmail.en;
    }

    public ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.shopifyService.getStoreData(params['shop'], params).subscribe(store => {
                this.store = store;
            });
        })
    }

    public createPassword({email, password}) {
        this.store.owner.email = email;
        this.store.owner.password = password;
        this.storeService.createStore(this.store)
            .subscribe((store: Store) => {
                    this.authService.loginByToken(store.owner.token);
                    this.router.navigate(['/']);
                },
                () => this.displayServerError = true);

        return false;
    }
}
