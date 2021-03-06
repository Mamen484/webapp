import { Component, OnInit } from '@angular/core';
import { groupBy, toPairs } from 'lodash';
import { StreamEventType, TimelineService } from '../../../projects/sfl-shared/lib/services/timeline.service';
import { TimelineEvent } from '../../../projects/sfl-shared/lib/entities/timeline-event';
import { Timeline } from '../../../projects/sfl-shared/lib/entities/timeline';
import { TimelineEventAction } from '../../../projects/sfl-shared/lib/entities/timeline-event-action.enum';
import { PageLoadingService } from '../core/services/page-loading.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'sf-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    preserveWhitespaces: false,
})
export class TimelineComponent implements OnInit {

    events;
    updates: TimelineEvent[];
    actions = TimelineEventAction;
    updatesInProgress = 0;
    nextLink = null;
    processing = false;
    infiniteScrollDisabled = false;
    loadingTimeline = true;
    showUpdates = true;

    constructor(protected timelineService: TimelineService,
                protected pageLoadingService: PageLoadingService,
                protected titleService: Title) {
        this.titleService.setTitle('Shoppingfeed / Timeline');
        this.timelineService.emitUpdatedTimeline();
        this.timelineService.getTimelineStream().subscribe(({type, data}) => {
            if (type === StreamEventType.finished) {
                this.pageLoadingService.finishLoading();
                let {updates, events} = data;
                this.initializeEvents(events);
                this.initializeUpdates(updates);
                return;
            }
            this.pageLoadingService.startLoading();
        });


    }

    ngOnInit() {
        this.pageLoadingService.startLoading();
        this.pageLoadingService.getState().subscribe(isLoading => this.loadingTimeline = isLoading);
    }

    onScroll() {
        if (this.processing || this.infiniteScrollDisabled) {
            return;
        }

        this.processing = true;
        this.timelineService.getEventsByLink(this.nextLink).subscribe(timeline => {
            this.nextLink = timeline._links.next && timeline._links.next.href;
            this.events = this.mergeEvents(this.groupEvents(timeline._embedded.timeline));

            if (!this.nextLink) {
                this.infiniteScrollDisabled = true;
            }
            this.processing = false;
        });
    }

    applyFilter({filter, isActive}) {
        this.pageLoadingService.startLoading();
        this.timelineService.getEvents(filter)
            .subscribe(timeline => {
                this.initializeEvents(timeline);
                this.pageLoadingService.finishLoading();
            });
        // display updates block only if no filters applied
        this.showUpdates = !isActive;
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
        this.events = this.groupEvents(timeline._embedded.timeline);
        this.nextLink = timeline._links.next && timeline._links.next.href;
        this.infiniteScrollDisabled = !this.nextLink;
    }

    protected groupEvents(timeline: TimelineEvent[]) {
        return toPairs(groupBy(timeline, (event: TimelineEvent) => event.occurredAt.split('T')[0]));
    }

    protected initializeUpdates(updates: Timeline<TimelineEvent>) {
        this.updates = updates._embedded.timeline;
        this.updatesInProgress = updates._embedded.timeline
            .filter(update => update.action === this.actions.start).length;
    }

}
