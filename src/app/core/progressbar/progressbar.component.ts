import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: 'progressbar.component.html',
  styleUrls: ['progressbar.component.scss']
})
export class ProgressbarComponent {
  @Input() progress: number;
  @Input() text: string;

  public getProgressAsCss() {
    return Math.max(0, Math.min(100, this.progress))+'%';
  }
}
