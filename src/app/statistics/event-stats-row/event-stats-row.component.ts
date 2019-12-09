import { Component, Input, OnInit } from '@angular/core';
import { TimelineEventAction } from '../../core/entities/timeline-event-action.enum';

@Component({
    selector: 'sf-event-stats-row',
    templateUrl: './event-stats-row.component.html',
    styleUrls: ['./event-stats-row.component.scss']
})
export class EventStatsRowComponent implements OnInit {

    @Input() action: TimelineEventAction;
    @Input() channelName?: string;
    eventDate: number;
    actions = TimelineEventAction;

    constructor() {
    }

    @Input() set date(value: string) {
        this.eventDate = new Date(value).getTime();
    };

    ngOnInit() {
    }

}
