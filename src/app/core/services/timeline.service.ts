import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TimelineEventName } from '../entities/timeline-event-name.enum';
import { TimelineUpdateName } from '../entities/timeline-update-name.enum';
import { Observable } from 'rxjs/Observable';
import { TimelineUpdate } from '../entities/timeline-update';
import { TimelineUpdateAction } from '../entities/timeline-update-action.enum';
import { Subject } from 'rxjs/Subject';
import { TimelineEventAction } from '../entities/timeline-event-action.enum';

const UPDATES_PERIOD = 1000 * 60 * 60 * 24; // 24 hours
const MAX_UPDATES = 200;

export const enum StreamEventType {started, finished}

@Injectable()
export class TimelineService {

    protected timelineStream = new Subject();

    constructor(protected httpClient: HttpClient) {
    }

    getEvents(storeId, url = `/v1/store/${storeId}/timeline`): any {
        return this.httpClient.get(environment.API_URL_WITHOUT_VERSION + url, {
            params: new HttpParams()
                .set(
                    'name', [
                        TimelineEventName.ruleTransformation,
                        TimelineEventName.ruleSegmentation,
                        TimelineEventName.orderLifecycle,
                        TimelineUpdateName.import,
                        TimelineUpdateName.export,
                    ].join(',')
                )
                .set(
                    'action', [
                        TimelineEventAction.create,
                        TimelineEventAction.push,
                        TimelineEventAction.delete,
                        TimelineEventAction.ship,
                        TimelineEventAction.update,
                        TimelineUpdateAction.error,
                    ].join(',')
                )
        })
    }

    getEventUpdates(storeId) {
        return this.httpClient.get(`${environment.API_URL}/store/${storeId}/timeline`,
            {
                params: new HttpParams()
                    .set('name', `${TimelineUpdateName.export},${TimelineUpdateName.import}`)
                    .set('since', new Date(Date.now() - UPDATES_PERIOD).toISOString())
                    .set('limit', String(MAX_UPDATES))
                    .set('action', [
                        TimelineUpdateAction.ask,
                        TimelineUpdateAction.start,
                        TimelineUpdateAction.finish,
                        TimelineUpdateAction.error
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
        let predicate = update.name === TimelineUpdateName.import
            ? item => item.name === TimelineUpdateName.import
            : item => item.name === TimelineUpdateName.export && item._embedded.channel.name === update._embedded.channel.name;

        return updatedTimeline.find(predicate) ? updatedTimeline : updatedTimeline.concat(update);
    }


    getUpdatesNumber(storeId): Observable<number> {
        return this.httpClient.head(`${environment.API_URL}/store/${storeId}/timeline`, {
            observe: 'response',
            responseType: 'text',
        }).map(({headers}) => Number(headers.get('X-New-Events-Count')));
    }

}
