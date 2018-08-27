import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { environment } from '../../environments/environment'
import { WindowRefService } from '../core/services/window-ref.service';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';
import { StoreService } from '../core/services/store.service';
import { SET_CHANNELS } from '../core/reducers/installed-channels-reducer';
import { SET_TAGS } from '../core/reducers/tags-reducer';
import { combineLatest } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { TagsService } from '../core/services/tags.service';
import { AggregatedUserInfo } from '../core/entities/aggregated-user-info';
import { Store as AppStore } from '../core/entities/store';

@Component({
    selector: 'app-homepage',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {

    constructor(protected appStore: Store<AppState>,
                protected windowRef: WindowRefService,
                protected storeService: StoreService,
                protected tagsService: TagsService) {

        this.configureAutopilot();

        this.appStore.select('currentStore').pipe(
            flatMap(store => this.storeService.getStoreChannels(store.id, new ChannelsRequestParams(true))),
            map(({_embedded}) => _embedded.channel.map(({_embedded: {channel}}) => channel))
        )
            .subscribe(channels => {
                this.appStore.dispatch({type: SET_CHANNELS, channels})
            });
        this.appStore.select('currentStore').pipe(
            flatMap(store => this.tagsService.fetchAll(store.id))
        )
            .subscribe(response => {
                this.appStore.dispatch({type: SET_TAGS, tags: response._embedded.tag});
            });
    }


    protected configureAutopilot() {
        combineLatest(this.appStore.select('userInfo'), this.appStore.select('currentStore'))
            .subscribe(([userInfo, currentStore]) => {
                if (!userInfo
                    || userInfo.isAdmin()
                    || !environment.RUN_AUTOPILOT
                    || <any>environment.RUN_AUTOPILOT === 'false') {
                    return;
                }

                this.windowRef.nativeWindow.Autopilot.run('associate', this.getDataForAssociate(userInfo, currentStore));

            });
    }

    protected getDataForAssociate(info: AggregatedUserInfo, store: AppStore) {
        return info.login === store.name
            ? {_simpleAssociate: true, Email: info.email, FirstName: store.name}
            : {
                _simpleAssociate: true,
                Email: environment.DEFAULT_AUTOPILOT_EMAIL,
                FirstName: environment.DEFAULT_AUTOPILOT_STORENAME,
            };

    }
}
