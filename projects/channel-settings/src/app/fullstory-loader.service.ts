import {Injectable} from '@angular/core';
import {SflUserService, SflWindowRefService} from 'sfl-shared/services';
import {environment} from '../environments/environment';
import { LOAD_FULLSTORY } from '../../../tracking-tools/src/lib/trackers/fullstory';

@Injectable({
    providedIn: 'root'
})
export class FullstoryLoaderService {

    loaded = false;

    constructor(protected windowRef: SflWindowRefService,
                protected userService: SflUserService) {
    }

    load() {
        this.userService.fetchAggregatedInfo()
            .subscribe((userInfo) => {
                const store = userInfo.findFirstDemoStore();
                if (userInfo.isAdmin() || !store || this.loaded) {
                    return;
                }
                this.loaded = true;
                LOAD_FULLSTORY(this.windowRef.nativeWindow, environment.fullstoryOrgId);
                this.windowRef.nativeWindow.FS.identify(store.id, {
                    displayName: store.name,
                    email: userInfo.email,
                });
            });
    }
}
