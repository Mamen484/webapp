import { Component, OnDestroy } from '@angular/core';
import { CreatePasswordService } from "./create-password.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import {ActivatedRoute} from "../../../../../node_modules/@angular/router/src/router_state";
import {Params} from "../../../../../node_modules/@angular/router/src/shared";

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnDestroy {
  public email: string = '';
  public password: string = '';

  private subscription: Subscription;

  constructor(
      private service: CreatePasswordService,
      private router: Router,
      private route: ActivatedRoute
  ) {}

  public createPassword() {
    this.route.queryParams.subscribe((params: Params) => {
      let observable: Observable<{success: boolean}> = this.service.createPassword({
        login: params['login'],
        email: this.email,
        password: this.password,
        token: 'srsly?',
        feed: params['feed'],
        feed_type: params['feed_type'],
        language: params['language'],
      });

      this.unsubscribe();
      this.subscription = observable.subscribe((result: {success: boolean}) => {
        if (!result.success) {
          return;
        }

        this.router.navigateByUrl('path/initial/create-account');
      });
    });


    return false;
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe() {
    this.subscription && this.subscription.unsubscribe();
  }
}
