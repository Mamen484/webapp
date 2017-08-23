import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelineEvent } from '../core/entities/timeline-event';
import { groupBy, orderBy, toPairs } from 'lodash';


@Component({
    selector: 'sf-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

    events: TimelineEvent[][];

    constructor(protected route: ActivatedRoute) {
        this.route.data.subscribe(
            ({timeline}) => this.events = orderBy(toPairs(groupBy(
                timeline._embedded.events,
                event => event.occurredAt.split('T')[0]
            )), 0, 'desc')
                .map(eventGroup => ([eventGroup[0], eventGroup[1].map(event => ({
                    icon: this.getIconName(event.type),
                    type: event.type,
                    time: new Date (event.occurredAt)
                }))]))
        )
        ;
    }

    protected getIconName(eventType) {
        switch (eventType.split('.')[0]) {
            case 'order':
                return 'shopping_basket';
        }
    }
}