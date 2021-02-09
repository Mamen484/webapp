import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { SflLocaleIdService, StoreService } from 'sfl-shared/services';
import { ChannelsRequestParams } from 'sfl-shared/entities';
import { SET_CHANNELS } from '../core/reducers/installed-channels-reducer';
import { SET_TAGS } from '../core/reducers/tags-reducer';
import { map } from 'rxjs/operators';
import { TagsService } from '../core/services/tags.service';
import { SidebarService } from 'sfl-tools/src/lib/sidebar';
import { SidebarService as LocalSidebarService } from './sidebar.service';


@Component({
    selector: 'app-homepage',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss'],
    providers: [
        {provide: SidebarService, useClass: LocalSidebarService}
    ],
})
export class BaseComponent {

    constructor(protected appStore: Store<AppState>,
                protected storeService: StoreService,
                protected tagsService: TagsService,
                public localeIdService: SflLocaleIdService) {

        this.appStore.select('currentStore').subscribe(store => {

            this.storeService.getStoreChannels(store.id, new ChannelsRequestParams(true)).pipe(
                map(({_embedded}) => _embedded.channel)).subscribe(channels => {
                this.appStore.dispatch({type: SET_CHANNELS, channels})
            });

            this.tagsService.fetchAll(store.id).subscribe(response => {
                this.appStore.dispatch({type: SET_TAGS, tags: response._embedded.tag});
            });
        });
    }


}
