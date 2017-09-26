import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Store } from '../core/entities/store';
import { Observable } from 'rxjs/Observable';
import { StoreChannelDetails } from '../core/entities/store-channel-details';
import { environment } from '../../environments/environment';
import { StoreService } from '../core/services/store.service';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';
import { WindowRefService } from '../core/services/window-ref.service';
import { Channel } from '../core/entities/channel';

@Component({
    selector: 'sf-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    opened = true;
    currentStore: Observable<Store>;
    channels: Observable<StoreChannelDetails[]>;
    currentRoute;

    constructor(protected appStore: AppStore<AppState>,
                @Inject(LOCALE_ID) protected localeId = environment.DEFAULT_LANGUAGE,
                protected storeService: StoreService,
                protected windowRef: WindowRefService) {
        this.currentStore = this.appStore.select('currentStore');
        this.channels = this.currentStore
            .flatMap(store => this.storeService.getStoreChannels(store.id, Object.assign(new ChannelsRequestParams, {status: 'installed'})))
            .map(({_embedded}) => _embedded.channel.map(({_embedded: {channel}}) => channel));

        this.appStore.select('currentRoute').subscribe(currentRoute => this.currentRoute = currentRoute);

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

    getChannelLink(channel: Channel) {
        return channel.type === 'marketplace'
            ? `/${channel.name}`
            : `/${channel.type}/manage/${channel.name}`;
    }

    onMenuOpen() {
        let menuElement = <HTMLDivElement>this.windowRef.nativeWindow.document.querySelector('.sf-sidebar-menu');
        menuElement.style.maxHeight = this.windowRef.nativeWindow.innerHeight - menuElement.getBoundingClientRect().top + 'px'
    }

}
