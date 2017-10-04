import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TimelineEventOperation } from '../entities/timeline-event-operation.enum';
import { TimelineEventType } from '../entities/timeline-event-type.enum';
import { TimelineUpdateType } from '../entities/timeline-update-type.enum';

@Injectable()
export class TimelineService {

    constructor(protected httpClient: HttpClient) {
    }

    getEvents(storeId, url = `/v1/store/${storeId}/timeline`): any {
        return this.httpClient.get(environment.API_URL_WITHOUT_VERSION + url, {
            params: new HttpParams()
                .set(
                    'name',
                    `${TimelineEventType.ruleTransformation}, ${TimelineEventType.ruleSegmentation}, ${TimelineEventType.orderLifecycle}`
                )
        })
    }

    getEventUpdates(storeId) {
        return this.httpClient.get(`${environment.API_URL}/store/${storeId}/timeline`,
            {
                params: new HttpParams().set('name', `${TimelineUpdateType.export},${TimelineUpdateType.import}`)
            })
    }

}
