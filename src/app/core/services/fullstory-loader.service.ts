import { Injectable } from '@angular/core';
import { LOAD_FULLSTORY } from '../../../trackers/fullstory';
import { environment } from '../../../environments/environment';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { flatMap, map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FullstoryLoaderService {

    loaded = false;

    constructor(protected windowRef: SflWindowRefService,
                protected appStore: Store<AppState>,
                protected userService: SflUserService) {
    }

    load() {
        if (this.loaded) {
            return;
        }
        this.loaded = true;
        this.userService.fetchAggregatedInfo().pipe(
            flatMap(userInfo => this.appStore.select('currentStore').pipe(
                take(1),
                map(store => ({userInfo, store}))
            )),
        ).subscribe(({userInfo, store}) => {
            LOAD_FULLSTORY(this.windowRef.nativeWindow, environment.FULLSTORY_ORG_ID);
            this.windowRef.nativeWindow.FS.identify(store.id, {
                displayName: store.name,
                email: userInfo.email,
            });
        });
    }
}
