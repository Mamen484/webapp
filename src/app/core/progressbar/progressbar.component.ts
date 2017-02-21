import {Component, Input, EventEmitter, AfterViewInit, Output, OnInit} from '@angular/core';
import {ProgressModel} from "./progress.model";

@Component({
  selector: 'app-progressbar',
  templateUrl: 'progressbar.component.html',
  styleUrls: ['progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit, AfterViewInit {
  /**
   * The initial progress rate (between 0 and 100)
   */
  @Input() initialProgress: number = 0;

  /**
   * The text to display over the progressbar
   */
  @Input() text: string = '';

  /**
   * Whether the progressbar should start on init or not.
   */
  @Input() autoStart: boolean = true;

  /**
   * This refresh event emitter
   */
  @Output() refresh: EventEmitter<ProgressModel> = new EventEmitter<ProgressModel>();

  /**
   * The timeing where progress events are sent.
   * Default to 100ms
   */
  @Input() refreshRate: number = 100;

  private progress: number = 0;

  /**
   * The number of times a progress event has been emitted
   */
  private occurredTimes: number = 0;

  public ngOnInit(): void {
    this.progress = this.initialProgress;
  }

  public ngAfterViewInit(): void {
    if (this.autoStart) {
      this.startTimeout()
    }
  }

  public getProgressAsCss() {
    return this.progress+'%';
  }

  public getTransitionAsCss(): string {
    return 'width '+(this.refreshRate / 1000)+'s linear'
  }

  private startTimeout() {
    setTimeout(() => {
      this.progress += this.refreshRate;
      this.occurredTimes++;

      let event = new ProgressModel(this.occurredTimes, this.refreshRate);
      this.refresh.emit(event);

      if (event.progress < 100) {
        this.progress = event.progress;
        this.startTimeout();
      }
    }, this.refreshRate);
  }
}
