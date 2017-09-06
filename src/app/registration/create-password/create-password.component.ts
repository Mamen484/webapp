import { Component, OnInit } from '@angular/core';
import { CreatePasswordService } from './create-password.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ShopifyAuthentifyService } from '../../core/services/shopify-authentify.service';
import { FormControl, Validators } from '@angular/forms';
import { CreateStoreModel } from '../../core/entities/create-store-model';
import { WindowRefService } from '../../core/services/window-ref.service';

@Component({
    selector: 'app-create-password',
    templateUrl: './create-password.component.html',
    styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

    public emailControl = new FormControl('', Validators.required);
    public passwordControl = new FormControl('', Validators.required);

    constructor(protected service: CreatePasswordService,
                protected router: Router,
                protected route: ActivatedRoute,
                protected shopifyService: ShopifyAuthentifyService,
                protected windowRef: WindowRefService) {
    }

    public ngOnInit() {
        this.route.queryParams
            .flatMap((params: Params) => this.shopifyService.getStoreData(params['shop'], params))
            .do((store) => this.windowRef.nativeWindow.localStorage.setItem('sf.path.initial', JSON.stringify(store)))
            .filter(store => store.storeId > 0)
            .subscribe((store: CreateStoreModel) => this.shopifyService.updateStore(store));
    }

    public createPassword() {
        if (this.emailControl.hasError('required') || this.passwordControl.hasError('required')) {
            return;
        }
        // This is currently shopify specific
        let store = CreateStoreModel.createForRegistration(this.emailControl.value, this.passwordControl.value);
        this.service.createPassword(store).filter(result => result.success)
            .flatMap(() => this.route.queryParams)
            .subscribe((queryParams) => {
                // query params are used to automatically connect to shopping-feed
                this.router.navigate(['register', 'create-account'], {queryParams});
            });

        return false;
    }
}
