import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TimelineEventName as eventName } from '../entities/timeline-event-name.enum';
import { TimelineUpdateName as updateName } from '../entities/timeline-update-name.enum';
import { Observable } from 'rxjs/Observable';
import { TimelineUpdate } from '../entities/timeline-update';
import { TimelineUpdateAction as updateAction } from '../entities/timeline-update-action.enum';
import { Subject } from 'rxjs/Subject';
import { TimelineEventAction as eventAction } from '../entities/timeline-event-action.enum';
import { TimelineFilter } from '../entities/timeline-filter';

const UPDATES_PERIOD = 1000 * 60 * 60 * 24; // 24 hours
const MAX_UPDATES = 200;

export const enum StreamEventType {started, finished}

@Injectable()
export class TimelineService {

    timelineStream = new Subject();

    constructor(protected httpClient: HttpClient) {
    }

    getEvents(storeId, url = `/v1/store/${storeId}/timeline`, dateFilter: TimelineFilter = new TimelineFilter()): any {
        let params = new HttpParams()
            .set('name', dateFilter.name.join(','))
            .set('action', dateFilter.action.join(','));
        params = dateFilter.since ? params.set('since', dateFilter.since.toJSON()) : params;
        params = dateFilter.until ? params.set('until', dateFilter.until.toJSON()) : params;

        return this.httpClient.get(environment.API_URL_WITHOUT_VERSION + url, {params})
    }

    getEventUpdates(storeId) {
        return this.httpClient.get(`${environment.API_URL}/store/${storeId}/timeline`,
            {
                params: new HttpParams()
                    .set('name', `${updateName.export},${updateName.import}`)
                    .set('since', new Date(Date.now() - UPDATES_PERIOD).toISOString())
                    .set('limit', String(MAX_UPDATES))
                    .set('action', [
                        updateAction.ask,
                        updateAction.start,
                        updateAction.finish,
                        updateAction.error
                    ].join(','))
            })
            .map(this.getDistinctUpdates.bind(this))

    }

    getTimelineStream() {
        return this.timelineStream.asObservable();
    }

    emitUpdatedTimeline(storeId) {
        this.timelineStream.next({type: StreamEventType.started});
        this.getEvents(storeId).zip(this.getEventUpdates(storeId))
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

    protected pushNextUpdate(updatedTimeline: TimelineUpdate[], update: TimelineUpdate) {
        let predicate = update.name === updateName.import
            ? item => item.name === updateName.import
            : item => item.name === updateName.export && item._embedded.channel.name === update._embedded.channel.name;

        return updatedTimeline.find(predicate) ? updatedTimeline : updatedTimeline.concat(update);
    }


    getUpdatesNumber(storeId): Observable<number> {
        return this.httpClient.head(`${environment.API_URL}/store/${storeId}/timeline`, {
            observe: 'response',
            responseType: 'text',
        }).map(({headers}) => Number(headers.get('X-New-Events-Count')));
    }

}
