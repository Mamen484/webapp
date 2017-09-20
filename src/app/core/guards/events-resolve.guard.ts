import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TimelineService } from '../services/timeline.service';

@Injectable()
export class EventsResolveGuard implements Resolve<any> {

    constructor(protected timelineService: TimelineService) {

    }

    resolve(): Observable<any> {
        return this.timelineService.getEvents();
    }
}
