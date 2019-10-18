import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { ShopifyAuthentifyService } from '../../core/services/shopify-authentify.service';
import { FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { SflLocalStorageService, StoreService } from 'sfl-shared/services';
import { Store } from 'sfl-shared/entities';

@Component({
    selector: 'app-create-password',
    templateUrl: './create-password.component.html',
    styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

    public emailControl = new FormControl('', [Validators.required, Validators.email]);
    public passwordControl = new FormControl('', [Validators.required, Validators.minLength(7)]);
    public supportEmail = environment.SUPPORT_EMAIL;
    public displayServerError = false;

    protected store;

    constructor(protected storeService: StoreService,
                protected router: Router,
                protected route: ActivatedRoute,
                protected shopifyService: ShopifyAuthentifyService,
                protected localStorage: SflLocalStorageService) {
    }

    public ngOnInit() {
        let cache = this.localStorage.getItem('sf.registration');
        if (cache) {
            this.store = JSON.parse(cache);
            return;
        }
        this.route.queryParams.pipe(
            flatMap((params: Params) => this.shopifyService.getStoreData(params['shop'], params)))
            .subscribe(store => {
                this.store = store;
            })
    }

    public createPassword() {
        if (this.emailControl.hasError('required')
            || this.passwordControl.hasError('required')
            || this.emailControl.hasError('email')
            || this.passwordControl.hasError('minlength')
        ) {
            return;
        }
        // This is currently shopify specific
        this.store.owner.email = this.emailControl.value;
        this.store.owner.password = this.passwordControl.value;
        this.storeService.createStore(this.store)
            .subscribe((store: Store) => {
                    this.localStorage.setItem('Authorization', `Bearer ${store.owner.token}`);
                    this.router.navigate(['register', 'create-account']);
                },
                () => this.displayServerError = true);

        return false;
    }
}
