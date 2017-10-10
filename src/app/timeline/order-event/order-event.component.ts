import { Component, Input, OnInit } from '@angular/core';
import { TimelineEventAction } from '../../core/entities/timeline-event-action.enum';

@Component({
  selector: 'sf-order-event',
  templateUrl: './order-event.component.html',
  styleUrls: ['./order-event.component.scss']
})
export class OrderEventComponent implements OnInit {

  @Input() operation;
  @Input() reference;

  operations = TimelineEventAction;

  constructor() { }

  ngOnInit() {
  }

}
