import { SidebarService as AbstractSidebarService } from 'sfl-tools/src/lib/sidebar';
import { Injectable } from '@angular/core';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { Store as UserStore } from 'sfl-shared/entities';
import { zip } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable(
    {providedIn: 'any'},
)
export class SidebarService implements AbstractSidebarService {

    constructor(private windowRef: SflWindowRefService,
                private store: Store<{ currentStore: UserStore }>,
                private userService: SflUserService) {
    }

    navigateToTimeline(): any {
        zip(this.store.select('currentStore').pipe(take(1)),
            this.userService.fetchAggregatedInfo())
            .subscribe(
                ([store, userInfo]) => {
                    this.windowRef.nativeWindow.location.href = `${environment.webAppLink}/timeline?token=${userInfo.token}&store=${store.id}`;
                }
            );
    }

    updateTicketsData(): any {
    }
}
