import { Component, Input, OnInit } from '@angular/core';
import { TimelineEventAction } from '../../core/entities/timeline-event-action.enum';

@Component({
    selector: 'sf-event-stats-row',
    templateUrl: './event-stats-row.component.html',
    styleUrls: ['./event-stats-row.component.scss']
})
export class EventStatsRowComponent implements OnInit {

    @Input() action: TimelineEventAction;
    @Input() date: string;
    @Input() channelName?: string;

    actions = TimelineEventAction;

    constructor() {
    }

    ngOnInit() {
    }

}
