import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TimelineEventName } from '../entities/timeline-event-name.enum';
import { TimelineUpdateName } from '../entities/timeline-update-name.enum';
import { Observable } from 'rxjs/Observable';
import { TimelineUpdate } from '../entities/timeline-update';
import { Timeline } from '../entities/timeline';
import { TimelineUpdateAction } from '../entities/timeline-update-action.enum';
import { findLast } from 'lodash';
import { Subject } from 'rxjs/Subject';

const UPDATES_PERIOD = 1000 * 60 * 60 * 6; // 6 hours
const MAX_UPDATES = 30;

const updateActions = {
    [TimelineUpdateAction.ask]: 0,
    [TimelineUpdateAction.start]: 1,
    [TimelineUpdateAction.finish]: 2
};

@Injectable()
export class TimelineService {

    timelineStream = new Subject();

    constructor(protected httpClient: HttpClient) {
    }

    getEvents(storeId, url = `/v1/store/${storeId}/timeline`): any {
        return this.httpClient.get(environment.API_URL_WITHOUT_VERSION + url, {
            params: new HttpParams()
                .set(
                    'name',
                    `${TimelineEventName.ruleTransformation}, ${TimelineEventName.ruleSegmentation}, ${TimelineEventName.orderLifecycle}`
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
            })
            .map((updates: Timeline<TimelineUpdate>) => this.removeDuplication(updates))

    }

    getTimelineStream() {
        return this.timelineStream.asObservable();
    }

    emitUpdatedTimeline(storeId) {
        this.getEvents(storeId).zip(this.getEventUpdates(storeId))
            .subscribe(([events, updates]) => this.timelineStream.next({events, updates}))
    }

    protected removeDuplication(updates) {
        let updatedTimeline = [];
        updates._embedded.timeline.reverse().forEach(update => this.pushNextUpdate(updatedTimeline, update));
        updates._embedded.timeline = updatedTimeline.reverse();
        return updates;
    }

    protected pushNextUpdate(updatedTimeline: TimelineUpdate[], update: TimelineUpdate) {
        let predicate = update.name === TimelineUpdateName.import
            ? item => item.name === TimelineUpdateName.import
            : item => item.name === TimelineUpdateName.export && item._embedded.channel.name === update._embedded.channel.name;

        let u = findLast(updatedTimeline, predicate);
        if (u && updateActions[update.action] > updateActions[u.action]) {
            updatedTimeline.splice(updatedTimeline.indexOf(u), 1);
        }
        updatedTimeline.push(update);
    }


    getUpdatesNumber(storeId): Observable<number> {
        return this.httpClient.head(`${environment.API_URL}/store/${storeId}/timeline`, {
            observe: 'response',
            responseType: 'text',
        }).map(({headers}) => Number(headers.get('X-New-Events-Count')));
    }

}
