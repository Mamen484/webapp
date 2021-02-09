import { Inject, Injectable } from '@angular/core';
import { LOAD_FULLSTORY } from './trackers/fullstory';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { map, mergeMap, take } from 'rxjs/operators';
import { Store as UserStore } from 'sfl-shared/entities';
import { FULLSTORY_ORG_ID } from './variables';

@Injectable({
    providedIn: 'root'
})
export class FullstoryLoaderService {

    loaded = false;

    constructor(private windowRef: SflWindowRefService,
                private appStore: Store<{ currentStore: UserStore }>,
                private userService: SflUserService,
                @Inject(FULLSTORY_ORG_ID) private fullstoreId) {
    }

    load() {
        if (this.loaded) {
            return;
        }
        this.loaded = true;
        this.userService.fetchAggregatedInfo().pipe(
            mergeMap(userInfo => this.appStore.select('currentStore').pipe(
                take(1),
                map(store => ({userInfo, store}))
            )),
        ).subscribe(({userInfo, store}) => {
            LOAD_FULLSTORY(this.windowRef.nativeWindow, this.fullstoreId);
            this.windowRef.nativeWindow.FS.identify(store.id, {
                displayName: store.name,
                email: userInfo.email,
            });
        });
    }
}
