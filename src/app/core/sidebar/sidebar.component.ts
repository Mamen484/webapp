import { Component, Inject, Input, LOCALE_ID } from '@angular/core';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { Store } from '../entities/store';
import { Observable } from 'rxjs/Observable';
import { StoreChannelDetails } from '../entities/store-channel-details';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'sf-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    appUrl = environment.APP_URL;
    opened = true;
    currentStore: Observable<Store>;
    channels: Observable<StoreChannelDetails[]>;

    constructor(protected _appStore: AppStore<AppState>, @Inject(LOCALE_ID) public localeId = 'fr') {
        this.currentStore = this._appStore.select('currentStore');
        this.channels = this._appStore.select('channels').filter(data => typeof data === 'object')
            .map(({_embedded}) => _embedded.storeChannel.map(({_embedded: {channel}}) => channel))

    }

    hasChannelsPermissions() {
        return this.currentStore.map(({permission}) => permission)
            .map(({ads, affiliation, marketplaces, retargeting, shopbots, solomo}) =>
                ads || affiliation || marketplaces || retargeting || shopbots || solomo);
    }

}
