import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreatePasswordService } from "./create-password.service";
import { Observable, Subscription } from "rxjs";
import { Router, ActivatedRoute, Params} from "@angular/router";
import {ShopifyAuthentifyService} from "../../../shopify/authentify/shopify-authentify.service";
import {CreateStoreModel} from "./create-store.model";

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit, OnDestroy {
  public store: CreateStoreModel;

  private subscription: Subscription;
  private queryParamsSubscription: Subscription;

  constructor(
    private service: CreatePasswordService,
    private router: Router,
    private route: ActivatedRoute,
    private shopifyService: ShopifyAuthentifyService
  ) {}

  public ngOnInit() {
    this.store = new CreateStoreModel();
    let cache = localStorage.getItem('sf.path.initial');

    if (cache) {
      this.store = JSON.parse(cache) as CreateStoreModel;
    } else {
      this.queryParamsSubscription = this.route.queryParams
          .subscribe((params: Params) => {
            this.shopifyService.getStoreData(params['shop'] || '', params)
                .subscribe((store: CreateStoreModel) => {
                  this.store = store;
                  localStorage.setItem('sf.path.initial', JSON.stringify(store));
                });
          });
    }
  }

  public createPassword() {
    // This is currently shopify specific
    let observable: Observable<{success: boolean}> = this.service.createPassword(this.store);

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
