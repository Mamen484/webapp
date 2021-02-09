import { Directive, OnInit } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { Store as UserStore } from 'sfl-shared/entities';
import { Store } from '@ngrx/store';
import { SflUserService } from 'sfl-shared/services';
import { FullstoryLoaderService } from './fullstory-loader.service';

@Directive({
    selector: '[sfEnableFullstory]'
})
export class EnableFullstoryDirective implements OnInit {

    constructor(private appStore: Store<{ currentStore: UserStore }>,
                private userService: SflUserService,
                private fullstoryLoader: FullstoryLoaderService) {
    }

    ngOnInit() {
        this.userService.fetchAggregatedInfo().subscribe(userInfo => {
            if (userInfo.isAdmin()) {
                return;
            }
            this.appStore.select('currentStore').pipe(
                filter(store => Boolean(store) && typeof store.country === 'string' && store.country.toLowerCase() === 'us'),
                take(1),
            ).subscribe((store: UserStore) => {
                this.enableFullstory(store, userInfo.email);
            });
        });
    }

    protected enableFullstory(store: UserStore, userEmail: string) {
        if (!UserStore.storeIsNew(store)) {
            return;
        }
        this.fullstoryLoader.load();
    }

}
