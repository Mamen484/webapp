import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreatePasswordService } from "./create-password.service";
import { Observable, Subscription } from "rxjs";
import { Router, ActivatedRoute, Params} from "@angular/router";
import {ShopifyAuthentifyService} from "../../../shopify/authentify/shopify-authentify.service";
import {CreateMerchantModel} from "./create-merchant.model";

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit, OnDestroy {
  public merchant: CreateMerchantModel;

  private subscription: Subscription;
  private queryParamsSubscription: Subscription;

  constructor(
    private service: CreatePasswordService,
    private router: Router,
    private route: ActivatedRoute,
    private shopifyService: ShopifyAuthentifyService
  ) {}

  public ngOnInit() {
    this.merchant = new CreateMerchantModel();
    let cache = localStorage.getItem('sf.path.initial');

    if (cache) {
      this.merchant = JSON.parse(cache) as CreateMerchantModel;
    } else {
      this.queryParamsSubscription = this.route.queryParams
          .subscribe((params: Params) => {
            this.shopifyService.getMerchantData(params['shop'] || '', params)
                .subscribe((merchant: CreateMerchantModel) => {
                  this.merchant = merchant;
                  localStorage.setItem('sf.path.initial', JSON.stringify(merchant));
                });
          });
    }
  }

  public createPassword() {
    // This is currently shopify specific
    let observable: Observable<{success: boolean}> = this.service.createPassword(this.merchant);

    this.unsubscribe();
    this.subscription = observable.subscribe((result: {success: boolean}) => {
      if (!result.success) {
        return;
      }

      this.router.navigateByUrl('path/initial/create-account');
    });

    return false;
  }

  public ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe() {
    this.subscription && this.subscription.unsubscribe();
  }
}
