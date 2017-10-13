import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TimelineEventName } from '../entities/timeline-event-name.enum';
import { TimelineUpdateName } from '../entities/timeline-update-name.enum';
import { Observable } from 'rxjs/Observable';

const UPDATES_PERIOD = 1000 * 60 * 60 * 6; // 6 hours
const MAX_UPDATES = 30;

@Injectable()
export class TimelineService {

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
    }

    getUpdatesNumber(storeId): Observable<number> {
        return this.httpClient.head(`${environment.API_URL}/store/${storeId}/timeline`, {
            observe: 'response',
            responseType: 'text',
        }).map(({headers}) => Number(headers.get('X-New-Events-Count')));
    }

}
