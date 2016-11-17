import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html'
})
export class TimelineComponent implements OnInit {

  public title : string;

  constructor() { }

  ngOnInit() {
    this.title = 'Timeline Module'
  }

}
