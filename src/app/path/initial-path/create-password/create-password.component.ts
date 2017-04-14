import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreatePasswordService } from "./create-password.service";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnDestroy, OnInit {
  public email: string = '';
  public password: string = '';
  private display: boolean = false;
  private hmac;
  private shop;
  private code;

  private subscription: Subscription;

  constructor(
      private service: CreatePasswordService,
      private router: Router,
      private route: ActivatedRoute
  ) {}

  public createPassword() {
    let observable: Observable<{success: boolean}> = this.service.createPassword(this.email, this.password);

    this.unsubscribe();
    this.subscription = observable.subscribe((result: {success: boolean}) => {
      if (!result.success) {
        return;
      }

      this.router.navigateByUrl('path/initial/create-account');
    });

    return false;
  }

  ngOnInit() {
    this.hasAuthorisation();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe() {
    this.subscription && this.subscription.unsubscribe();
  }

  private hasAuthorisation() {
    this.route.queryParams
        .subscribe((params: Params) => {
          this.hmac = params['hmac'];
          this.shop = params['shop'];
          this.code = params['code'];

          if (!this.shop) {
            window.location.href = 'https://apps.shopify.com/shopping-feed-dev';
          }

          if (!this.code) {
            this.service.getAuthorizationUrl(this.shop).subscribe((url: string) => {
              window.location.href = url;
            });
          }
        });
  }
}
