import {Component, OnDestroy} from '@angular/core';
import { CreatePasswordService } from "./create-password.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";

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
      private router: Router
  ) {}

  public createPassword() {
    let observable: Observable<{success: boolean}> = this.service.createPassword(this.email, this.password);

    this.unsubscribe();
    this.subscription = observable.subscribe((result: {success: boolean}) => {
      if (!result['success']) {
        return;
      }

      this.router.navigateByUrl('path/initial/create-account');
    });

    return false;
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
