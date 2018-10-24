import { Observable, Subject, zip } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TimelineFilter } from '../entities/timeline-filter';
import { TimelineEvent } from '../entities/timeline-event';
import { TimelineEventAction } from '../entities/timeline-event-action.enum';
import { TimelineEventName } from '../entities/timeline-event-name.enum';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';

const UPDATES_PERIOD = 1000 * 60 * 60 * 24; // 24 hours
const MAX_UPDATES = 200;
const MAX_EVENTS = 50;

export const enum StreamEventType {started, finished}

@Injectable()
export class TimelineService {

    protected timelineStream = new Subject();

    constructor(protected httpClient: HttpClient, protected appStore: Store<AppState>) {
    }

    getEvents(dateFilter: TimelineFilter = new TimelineFilter(), limit = MAX_EVENTS): any {
        let params = new HttpParams()
            .set('limit', String(limit))
            .set('name', dateFilter.name.join(','))
            .set('action', dateFilter.action.join(','));
        params = dateFilter.since ? params.set('since', dateFilter.since.toJSON()) : params;
        params = dateFilter.until ? params.set('until', dateFilter.until.toJSON()) : params;

        return this.appStore.select('currentStore').pipe(
            flatMap(store =>
                this.httpClient.get(environment.API_URL_WITHOUT_VERSION + `/v1/store/${store.id}/timeline`, {params})
            )
        );
    }

    getEventsByLink(url): any {
        return this.httpClient.get(environment.API_URL_WITHOUT_VERSION + url);
    }

    getEventUpdates() {
        return this.appStore.select('currentStore').pipe(
            flatMap(store => this.httpClient.get(`${environment.API_URL}/store/${store.id}/timeline`,
                {
                    params: new HttpParams()
                        .set('name', `${TimelineEventName.export},${TimelineEventName.import}`)
                        .set('since', new Date(Date.now() - UPDATES_PERIOD).toISOString())
                        .set('limit', String(MAX_UPDATES))
                        .set('action', [
                            TimelineEventAction.ask,
                            TimelineEventAction.start,
                            TimelineEventAction.finish,
                            TimelineEventAction.error
                        ].join(','))
                })),
            map(this.getDistinctUpdates.bind(this)));

    }

    getTimelineStream() {
        return this.timelineStream.asObservable();
    }

    emitUpdatedTimeline() {
        this.timelineStream.next({type: StreamEventType.started});
        zip(this.getEvents(), this.getEventUpdates())
            .subscribe(([events, updates]) => this.timelineStream.next({
                type: StreamEventType.finished,
                data: {events, updates}
            }))
    }

    protected getDistinctUpdates(updates) {
        updates._embedded.timeline = updates._embedded.timeline
            .reduce((updatedTimeline, update) => this.pushNextUpdate(updatedTimeline, update), []);
        return updates;
    }

    protected pushNextUpdate(updatedTimeline: TimelineEvent[], update: TimelineEvent) {
        let predicate = update.name === TimelineEventName.import
            ? item => item.name === TimelineEventName.import
            : item => item.name === TimelineEventName.export && item._embedded.channel.name === update._embedded.channel.name;

        return updatedTimeline.find(predicate) ? updatedTimeline : updatedTimeline.concat(update);
    }


    getUpdatesNumber(): Observable<number> {
        return this.appStore.select('currentStore').pipe(
            flatMap(store => this.httpClient.head(`${environment.API_URL}/store/${store.id}/timeline`, {
                observe: 'response',
                responseType: 'text',
            })),
            map(({headers}) => Number(headers.get('X-New-Events-Count'))));
    }

}
