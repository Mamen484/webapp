import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TimelineService } from '../services/timeline.service';
import { AppState } from '../entities/app-state';
import { Store } from '@ngrx/store';

@Injectable()
export class EventsResolveGuard implements Resolve<any> {

    constructor(protected timelineService: TimelineService, protected appStore: Store<AppState>) {

    }

    resolve(): Observable<any> {
        return this.appStore.select('currentStore')
            .take(1)
            .flatMap(store => this.timelineService.getEvents(store.id));
    }
}
