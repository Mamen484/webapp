import { Observable, Subject, zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
    PagedResponse,
    SFL_API,
    Store as UserStore,
    TimelineEvent,
    TimelineEventAction,
    TimelineEventName,
    TimelineFilter
} from 'sfl-shared/entities';
import { Store } from '@ngrx/store';

const UPDATES_PERIOD = 1000 * 60 * 60 * 24; // 24 hours
const MAX_UPDATES = 200;
const MAX_EVENTS = 50;

export const enum StreamEventType {started, finished}

@Injectable({
    providedIn: 'root'
})
export class TimelineService {

    protected timelineStream = new Subject();

    constructor(protected httpClient: HttpClient, protected appStore: Store<{ currentStore: UserStore }>, @Inject(SFL_API) private sflApi) {
    }

    getEvents(dateFilter: TimelineFilter = new TimelineFilter(), limit = MAX_EVENTS) {
        let params = new HttpParams()
            .set('limit', String(limit))
            .set('name', dateFilter.name.join(','))
            .set('action', dateFilter.action.join(','));
        params = dateFilter.since ? params.set('since', dateFilter.since.toJSON()) : params;
        params = dateFilter.until ? params.set('until', dateFilter.until.toJSON()) : params;

        return this.appStore.select('currentStore').pipe(
            mergeMap(store =>
                this.httpClient.get(this.sflApi + `/store/${store.id}/timeline`, {params})
            )
        ) as Observable<PagedResponse<{ timeline: TimelineEvent[]; }>>;
    }

    getEventsByLink(url) {
        return this.httpClient.get(new URL(this.sflApi).origin + url) as Observable<PagedResponse<{ timeline: TimelineEvent[]; }>>;
    }

    getEventUpdates() {
        return this.appStore.select('currentStore').pipe(
            mergeMap(store => this.httpClient.get(`${this.sflApi}/store/${store.id}/timeline`,
                {
                    params: new HttpParams()
                        .set('name', `${TimelineEventName.export},${TimelineEventName.import}`)
                        .set('since', new Date(Date.now() - UPDATES_PERIOD).toISOString())
                        .set('limit', String(MAX_UPDATES))
                        .set('action', [
                            TimelineEventAction.ask,
                            TimelineEventAction.start,
                            TimelineEventAction.finish,
                            TimelineEventAction.error,
                            TimelineEventAction.cancel,
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

    getUpdatesNumber(): Observable<number> {
        return this.appStore.select('currentStore').pipe(
            mergeMap(store => this.httpClient.head(`${this.sflApi}/store/${store.id}/timeline`, {
                observe: 'response',
                responseType: 'text',
            })),
            map(({headers}) => Number(headers.get('X-New-Events-Count'))));
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

}
