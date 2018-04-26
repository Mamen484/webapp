import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { environment } from '../../environments/environment'
import { WindowRefService } from '../core/services/window-ref.service';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';
import { StoreService } from '../core/services/store.service';
import { SET_CHANNELS } from '../core/reducers/installed-channels-reducer';
import { SET_TAGS } from '../core/reducers/tags-reducer';

declare const Autopilot;

@Component({
    selector: 'app-homepage',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {

    constructor(protected appStore: Store<AppState>,
                protected windowRef: WindowRefService,
                protected storeService: StoreService) {
        this.appStore.select('userInfo')
            .combineLatest(this.appStore.select('currentStore'))
            .subscribe(([userInfo, currentStore]) => {
                if (!environment.RUN_AUTOPILOT || <any>environment.RUN_AUTOPILOT === 'false') {
                    return;
                }
                if (userInfo.login === currentStore.name) {
                    (<any>this.windowRef.nativeWindow).Autopilot.run('associate',
                        {_simpleAssociate: true, Email: userInfo.email, FirstName: currentStore.name});
                } else {
                    (<any>this.windowRef.nativeWindow).Autopilot.run('associate',
                        {
                            _simpleAssociate: true,
                            Email: environment.DEFAULT_AUTOPILOT_EMAIL,
                            FirstName: environment.DEFAULT_AUTOPILOT_STORENAME,
                        });
                }
            });
        this.appStore.select('currentStore')
            .flatMap(store => this.storeService.getStoreChannels(store.id, new ChannelsRequestParams(true)))
            .map(({_embedded}) => _embedded.channel.map(({_embedded: {channel}}) => channel))
            .subscribe(channels => {
                this.appStore.select('installedChannels').dispatch({type: SET_CHANNELS, channels})
            });
        this.appStore.select('currentStore')
            .flatMap(store => this.storeService.fetchAvailableTags(store.id))
            .subscribe(response => {
                this.appStore.select('tags').dispatch({type: SET_TAGS, tags: response._embedded.tag});
            });
    }
}
