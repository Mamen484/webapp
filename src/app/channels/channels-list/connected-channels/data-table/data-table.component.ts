import { Component, Input, OnInit } from '@angular/core';
import {
  ChannelStatistics,
  StoreChannel,
  TimelineEvent,
  TimelineEventAction,
  TimelineEventName,
  TimelineFilter
} from 'sfl-shared/entities';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TimelineService } from 'sfl-shared/services';

const maxEvents = 200;

@Component({
  selector: 'sf-connected-channels-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() channels: StoreChannel[] = [];
  @Input() statistics: { [key: number]: ChannelStatistics };
  @Input() currency;

  exports: { [key: number]: TimelineEvent };
  subscription = new Subscription();

  constructor(private timelineService: TimelineService) { }

  ngOnInit(): void {
    this.fetchExports();
  }

  private fetchExports() {
    const timelineFilter = new TimelineFilter();
    timelineFilter.action = [TimelineEventAction.finish, TimelineEventAction.error];
    timelineFilter.name = [TimelineEventName.export];

    this.subscription.add(
        this.timelineService.getEvents(timelineFilter, maxEvents).pipe(
            map(response => response._embedded.timeline)
        ).subscribe(timeline => {
          this.exports = timeline.reduce((acc, current) => {
            return acc[current._embedded.channel.id] ? acc : Object.assign(acc, {[current._embedded.channel.id]: current})
          }, {});
        })
    );
  }

}
