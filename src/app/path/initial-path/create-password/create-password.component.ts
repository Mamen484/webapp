import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreatePasswordService } from "./create-password.service";
import { Observable, Subscription } from "rxjs";
import { Router, ActivatedRoute, Params} from "@angular/router";
import {ShopifyAuthentifyService} from "../../../shopify/authentify/shopify-authentify.service";
import {CreateStoreModel} from "./create-store.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit, OnDestroy {
  public store: CreateStoreModel;

  private subscription: Subscription;
  private queryParamsSubscription: Subscription;
  private queryParam: object;

  constructor(
    private service: CreatePasswordService,
    private router: Router,
    private route: ActivatedRoute,
    private shopifyService: ShopifyAuthentifyService
  ) {}

  public ngOnInit() {
    this.store = new CreateStoreModel();

    this.queryParamsSubscription = this.route.queryParams
        .subscribe((params: Params) => {
          !params['shop'] && (window.location.href = environment.SHOPIFY_APP_URL);
          this.queryParam = params;
          this.shopifyService.getStoreData(params['shop'] || '', params)
              .subscribe((store: CreateStoreModel) => {
                this.store = store;
                if (store.store.storeId > 0){
                  this.shopifyService.updateStore(store, this.queryParam);
                }
                else {
                  localStorage.setItem('sf.path.initial', JSON.stringify(store));
                }
              });
        });

  }

  public createPassword() {
    // This is currently shopify specific
    let observable: Observable<{success: boolean}> = this.service.createPassword(this.store);

    this.unsubscribe();
    this.subscription = observable.subscribe((result: {success: boolean}) => {
      if (!result.success) {
        return;
      }

      // passing the query parameters is important,
      // they are used after to automatically connect to shopping-feed
      let url = 'path/initial/create-account?';
      for (let param in this.queryParam as any) {
        if (this.queryParam.hasOwnProperty(param)) {
          url += param + '=' + this.queryParam[param] + '&';
        }
      }
      this.router.navigateByUrl(url);
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
