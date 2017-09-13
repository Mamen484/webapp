import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Store } from '../core/entities/store';
import { Observable } from 'rxjs/Observable';
import { StoreChannelDetails } from '../core/entities/store-channel-details';
import { environment } from '../../environments/environment';
import { StoreService } from '../core/services/store.service';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';

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

    constructor(
        protected _appStore: AppStore<AppState>,
        @Inject(LOCALE_ID) protected localeId = environment.DEFAULT_LANGUAGE,
        protected storeService: StoreService) {
        this.currentStore = this._appStore.select('currentStore');
        this.channels = this.currentStore
            .flatMap(store => this.storeService.getStoreChannels(store.id, Object.assign(new ChannelsRequestParams, {status: 'installed'})))
            .map(({_embedded}) => _embedded.channel.map(({_embedded: {channel}}) => channel));

    }

    hasChannelsPermissions() {
        return this.currentStore.map(({permission}) => permission)
            .map(({ads, affiliation, marketplaces, retargeting, shopbots, solomo}) =>
                ads || affiliation || marketplaces || retargeting || shopbots || solomo);
    }

    getSupportLink() {
        switch (this.localeId) {
            case 'fr':
                return `${environment.SUPPORT_URL}/customer/fr_fr/portal/articles`;

            case 'it':
            case 'es':
                return `${environment.SUPPORT_URL}/customer/${this.localeId}/portal/articles`;

            default:
                return environment.SUPPORT_URL;
        }
    }

}
