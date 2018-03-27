import { Component } from '@angular/core';
import { groupBy, toPairs } from 'lodash';
import { TimelineUpdate } from '../core/entities/timeline-update';
import { TimelineUpdateAction } from '../core/entities/timeline-update-action.enum';
import { StreamEventType, TimelineService } from '../core/services/timeline.service';
import { TimelineEvent } from '../core/entities/timeline-event';
import { TimelineEventFormatted } from '../core/entities/timeline-event-formatted';
import { Timeline } from '../core/entities/timeline';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { TimelineUpdateName } from '../core/entities/timeline-update-name.enum';

@Component({
    selector: 'sf-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    preserveWhitespaces: false,
})
export class TimelineComponent {

    events;
    updates: TimelineUpdate[];
    updateOperations = TimelineUpdateAction;
    updatesInProgress = 0;
    nextLink = null;
    processing = false;
    infiniteScrollDisabled = false;
    loadingTimeline = true;

    constructor(protected appStore: Store<AppState>,
                protected timelineService: TimelineService) {
        this.appStore.select('currentStore').take(1)
            .subscribe(currentStore => this.timelineService.emitUpdatedTimeline(currentStore.id));

        this.timelineService.getTimelineStream().subscribe(({type, data}) => {
            if (type === StreamEventType.finished) {
                this.loadingTimeline = false;
                let {updates, events} = data;
                this.initializeEvents(events);
                this.initializeUpdates(updates);
                return;
            }
            this.loadingTimeline = true;
        });
    }

    onScroll() {
        if (this.processing || this.infiniteScrollDisabled) {
            return;
        }

        this.processing = true;
        this.timelineService.getEventsByLink(this.nextLink).subscribe(timeline => {
            this.nextLink = timeline._links.next && timeline._links.next.href;
            this.events = this.mergeEvents(this.formatEvents(timeline._embedded.timeline));

            if (!this.nextLink) {
                this.infiniteScrollDisabled = true;
            }
            this.processing = false;
        });
    }

    applyFilter(filter) {
        this.loadingTimeline = true;
        this.appStore.select('currentStore').flatMap(store =>
            this.timelineService.getEvents(store.id, filter))
            .subscribe(timeline => {
                this.initializeEvents(timeline);
                this.loadingTimeline = false;
            });
    }

    getUpdateLink(update: TimelineUpdate) {
        if (update.name === TimelineUpdateName.import) {
            return '/tools/infos';
        } else {
            return this.getChannelLink(update);
        }
    }

    /**
     * Add events of the new page to existing events list
     *
     * @param formatted
     */
    protected mergeEvents(formatted) {

        if (this.groupsEqual(this.events[this.events.length - 1], formatted[0])) {
            this.mergeTwoGroups(this.events[this.events.length - 1][1], formatted);
        }
        return this.events.concat(formatted);
    }

    /**
     * check if the last existing group of events has the same date as the first group in the new page
     * @param {Array} group1 - 0: group name, 1: events array
     * @param {Array} group2 - 0: group name, 1: events array
     */
    protected groupsEqual(group1, group2) {
        return group1[0] === group2[0]
    }

    /**
     * Merge first index of group2 into group1, deleting first index of group2.
     * Used to move events of two groups with equal date into one group to avoid duplications.
     *
     * @param {Array<Array>} group1 - Array<0: group name, 1: events array>
     * @param {Array<Array>} group2 - Array<0: group name, 1: events array>
     */
    protected mergeTwoGroups(group1, group2) {
        let toInsert = group2.shift();
        group1.push(...toInsert[1]);
    }

    protected initializeEvents(timeline) {
        this.events = this.formatEvents(timeline._embedded.timeline);
        this.nextLink = timeline._links.next && timeline._links.next.href;
        this.infiniteScrollDisabled = !this.nextLink;
    }

    protected formatEvents(timeline: TimelineEvent[]) {
        return toPairs(groupBy(timeline, (event: TimelineEvent) => event.occurredAt.split('T')[0]))
            .map(eventGroup => ([
                eventGroup[0],
                eventGroup[1].map((event: TimelineEvent) => new TimelineEventFormatted(event))
            ]));
    }

    protected initializeUpdates(updates: Timeline<TimelineUpdate>) {
        this.updates = updates._embedded.timeline;
        this.updatesInProgress = updates._embedded.timeline
            .filter(update => update.action === this.updateOperations.start).length;
    }

    // TOFIX: refactor duplicated logic from suggested-channel
    protected getChannelLink(update) {
        return update._embedded.channel.type === 'marketplace'
            ? `/${update._embedded.channel.name}`
            : `/${update._embedded.channel.type}/manage/${update._embedded.channel.name}`;
    }

}
