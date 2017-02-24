import { Component } from '@angular/core';
import { ProgressModel } from "../../../core/progressbar/progress.model";
import { ConfigService } from "../../../core/config/config.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  private creationTime: number = 10000;

  constructor(
      private config: ConfigService,
      private router: Router
  ) {}

  public refreshProgressBar(event: ProgressModel) {
    event.progress = event.occurrence * event.refreshRate * 100 / this.creationTime;
  }

  public onFinish() {
    window.location = this.config.get('app').baseUrl;
  }
}
