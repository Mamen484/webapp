import { Component, OnInit } from '@angular/core';
import { ProgressModel } from "../../../core/progressbar/progress.model";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  private creationTime: number = 10000;
  private queryParams: object;

  constructor(
      private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    // remove the create password cache
    localStorage.removeItem('sf.path.initial');
    this.route.queryParams.subscribe((params: Params) => {this.queryParams = params} );
  }

  public refreshProgressBar(event: ProgressModel) {
    event.progress = event.occurrence * event.refreshRate * 100 / this.creationTime;
  }

  public onFinish() {
    // query params are passed to shopping feed to auto connect the user
    window.location.href = environment.APP_URL+'?'+this.queryParams.toString();
  }
}
