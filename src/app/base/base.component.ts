import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { UPDATE_TIMELINE } from '../core/reducers/current-store-reducer';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../core/services/user.service';

const MINUTE = 6e4;

@Component({
    selector: 'app-homepage',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {

    constructor(protected appStore: Store<AppState>,
                protected userService: UserService) {
        this.pollTimelineEventsChanges();
    }

    protected pollTimelineEventsChanges() {
        Observable.interval(MINUTE).flatMap(() => this.userService.fetchAggregatedInfo(true))
            .subscribe(userInfo => {
                this.appStore.select('currentStore').take(1).subscribe(currentStore => {
                    let timelineEvents = userInfo._embedded.store.find(store => store.id === currentStore.id).timeline.total;
                    this.appStore.dispatch({type: UPDATE_TIMELINE, timelineEvents});
                })
            })
    }
}
