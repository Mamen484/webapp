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

    protected store;

    constructor(protected service: CreatePasswordService,
                protected router: Router,
                protected route: ActivatedRoute,
                protected shopifyService: ShopifyAuthentifyService,
                protected windowRef: WindowRefService) {
    }

    public ngOnInit() {
        this.route.queryParams
            .flatMap((params: Params) => this.shopifyService.getStoreData(params['shop'], params))
            .subscribe(store => {
                this.store = store;
            })
    }

    public createPassword() {
        console.log(this.store);
        if (this.emailControl.hasError('required') || this.passwordControl.hasError('required')) {
            return;
        }
        // This is currently shopify specific
        this.store.owner.email = this.emailControl.value;
        this.store.owner.password = this.passwordControl.value;
        this.service.createPassword(this.store).filter(result => result.success)
            .flatMap(() => this.route.queryParams)
            .subscribe((queryParams) => {
                // query params are used to automatically connect to shopping-feed
                this.router.navigate(['register', 'create-account'], {queryParams});
            });

        return false;
    }
}
