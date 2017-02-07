import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  private refreshRate: number = 100;
  private creationTime: number = 15000;

  private elapsedTime: number = 0;
  private progress: number = 0;

  ngOnInit(): void {
    this.startTimeout();
  }

  public refreshProgressBar() {
    this.elapsedTime += this.refreshRate;
    this.progress = this.elapsedTime * 100 / this.creationTime;
  }

  private startTimeout() {
    setTimeout(() => {
      this.refreshProgressBar();
      if (this.elapsedTime < this.creationTime) {
        this.startTimeout();
      }
    }, this.refreshRate);
  }
}
