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
  private queryParam: object;

  constructor(
      private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {this.queryParam = params} );
  }

  public refreshProgressBar(event: ProgressModel) {
    event.progress = event.occurrence * event.refreshRate * 100 / this.creationTime;
  }

  public onFinish() {
    // query params are passed to shopping feed to auto connect the user
    let url = environment.APP_URL+'?';

    for (let param in this.queryParam as any) {
      if (this.queryParam.hasOwnProperty(param)) {
        url += param + '=' + this.queryParam[param] + '&';
      }
    }

    window.location.href = url;
  }
}
