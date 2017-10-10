import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { groupBy, orderBy, toPairs } from 'lodash';
import { TimelineEventType } from '../core/entities/timeline-event-type.enum';
import { TimelineUpdate } from '../core/entities/timeline-update';
import { TimelineUpdates } from '../core/entities/timeline-updates';
import { TimelineUpdateType } from '../core/entities/timeline-update-type.enum';
import { TimelineUpdateOperation } from '../core/entities/timeline-update-operation.enum';
import { TimelineService } from '../core/services/timeline.service';
import { TimelineEvent } from '../core/entities/timeline-event';


@Component({
    selector: 'sf-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

    events;
    updates: TimelineUpdate[];
    eventTypes = TimelineEventType;
    updateTypes = TimelineUpdateType;
    updateOperations = TimelineUpdateOperation;
    updatesInProgress = 0;
    nextLink = null;
    processing = false;
    infiniteScrollDisabled = false;

    constructor(protected route: ActivatedRoute, protected timelineService: TimelineService) {
        this.route.data.subscribe(
            ({timeline, updates}) => {
                this.initializeEvents(timeline);
                this.initializeUpdates(updates);
            }
        );
    }

    onScroll() {
        if (this.processing || this.infiniteScrollDisabled) {
            return;
        }

        this.processing = true;
        this.timelineService.getEvents(null, this.nextLink).subscribe(timeline => {
            this.nextLink = timeline._links.next && timeline._links.next.href;
            let formatted = this.formatEvents(timeline);
            if (this.events[this.events.length - 1][0] === formatted[0][0]) {
                let ar = this.events[this.events.length - 1][1];
                let toInsert = formatted.shift();
                ar.push(...toInsert[1]);
            }
            this.events.push(...formatted);

            if (!this.nextLink) {
                this.infiniteScrollDisabled = true;
            }
            this.processing = false;
        });
    }

    protected initializeEvents(timeline) {
        this.events = this.formatEvents(timeline);
        this.nextLink = timeline._links.next && timeline._links.next.href;
        if (!this.nextLink) {
            this.infiniteScrollDisabled = true;
        }
    }

    protected formatEvents(timeline) {
        return orderBy(toPairs(groupBy(
            timeline._embedded.timeline,
            (event: TimelineEvent) => event.occurredAt.split('T')[0]
        )), 0, 'desc')
            .map(eventGroup => ([eventGroup[0], eventGroup[1].map((event: TimelineEvent) => ({
                icon: this.getIconName(event.name),
                type: event.name,
                time: new Date(event.occurredAt),
                operation: event.action,
                reference:
                    event.name === TimelineEventType.orderLifecycle
                        ? event.data.reference
                        : '',
                ruleName:
                    event.name === TimelineEventType.ruleTransformation || event.name === TimelineEventType.ruleSegmentation
                        ? event.data.name
                        : ''
            }))]));
    }

    protected initializeUpdates(updates: TimelineUpdates) {
        this.updates = updates._embedded.timeline;
        this.updatesInProgress = updates._embedded.timeline
            .filter(update => update.action === this.updateOperations.start).length;
    }

    protected getIconName(eventType) {
        switch (eventType) {
            case TimelineEventType.orderLifecycle:
                return 'shopping_basket';

            case TimelineEventType.ruleSegmentation:
            case TimelineEventType.ruleTransformation:
                return 'build';

        }
    }
}
