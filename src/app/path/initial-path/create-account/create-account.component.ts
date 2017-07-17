import { Component, OnInit } from '@angular/core';
import { ProgressModel } from "../../../core/progressbar/progress.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  private creationTime: number = 10000;

  constructor(
  ) {}

  public ngOnInit() {
    // remove the create password cache
    localStorage.removeItem('sf.path.initial');
  }

  public refreshProgressBar(event: ProgressModel) {
    event.progress = event.occurrence * event.refreshRate * 100 / this.creationTime;
  }

  public onFinish() {
    window.location.href = environment.APP_URL;
  }
}
