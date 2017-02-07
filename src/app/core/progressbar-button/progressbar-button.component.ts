import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-progressbar-button',
  templateUrl: './progressbar-button.component.html',
  styleUrls: ['./progressbar-button.component.scss']
})
export class ProgressbarButtonComponent implements OnInit {
  @Input() progress: number;
  @Input() value: string;

  constructor() { }

  ngOnInit() {
  }

}
