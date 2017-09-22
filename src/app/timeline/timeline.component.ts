import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelineEvent } from '../core/entities/timeline-event';
import { groupBy, orderBy, toPairs } from 'lodash';
import { TimelineEventType } from '../core/entities/timeline-event-type.enum';
import { TimelineUpdate } from '../core/entities/timeline-update';
import { TimelineUpdates } from '../core/entities/timeline-updates';
import { TimelineUpdateType } from '../core/entities/timeline-update-type.enum';
import { TimelineUpdateOperation } from '../core/entities/timeline-update-operation.enum';
import { TimelineService } from '../core/services/timeline.service';


@Component({
    selector: 'sf-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

    events: TimelineEvent[][];
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
        if (this.processing) {
            return;
        }
        if (!this.nextLink) {
            this.infiniteScrollDisabled = true;
            return;
        }
        this.processing = true;
        this.timelineService.getEvents(this.nextLink).subscribe(timeline => {
            this.nextLink = timeline._links.next.href;
            this.processing = false;
            this.events.push(...this.formatEvents(timeline));
        });
    }

    protected initializeEvents(timeline) {
        this.events = this.formatEvents(timeline);
        this.nextLink = timeline._links.next.href;
    }

    protected formatEvents(timeline) {
        return orderBy(toPairs(groupBy(
            timeline._embedded.events,
            event => event.occurredAt.split('T')[0]
        )), 0, 'desc')
            .map(eventGroup => ([eventGroup[0], eventGroup[1].map(event => ({
                icon: this.getIconName(event.type),
                type: event.type,
                time: new Date(event.occurredAt),
                operation: event.operation,
                reference:
                    event.type === TimelineEventType.orderLifecycle
                        ? event._embedded.order[0].reference
                        : '',
                ruleName:
                    event.type === TimelineEventType.ruleTransformation || event.type === TimelineEventType.ruleSegmentation
                        ? event._embedded.rules[0].name
                        : ''
            }))]));
    }

    protected initializeUpdates(updates: TimelineUpdates) {
        this.updates = updates._embedded.updates;
        this.updatesInProgress = updates._embedded.updates
            .filter(update => update.operation === this.updateOperations.start).length;
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