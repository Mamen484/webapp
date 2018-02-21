import { Component, ElementRef, Inject, LOCALE_ID } from '@angular/core';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Store } from '../core/entities/store';
import { Observable } from 'rxjs/Observable';
import { StoreChannelDetails } from '../core/entities/store-channel-details';
import { StoreService } from '../core/services/store.service';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';
import { WindowRefService } from '../core/services/window-ref.service';
import { Channel } from '../core/entities/channel';
import { SupportLinkService } from '../core/services/support-link.service';

@Component({
    selector: 'sf-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    opened = true;
    currentStore: Store;
    channels: Observable<StoreChannelDetails[]>;
    linkToSupportCenter;

    constructor(protected _appStore: AppStore<AppState>,
                protected storeService: StoreService,
                protected windowRef: WindowRefService,
                protected supportLinkService: SupportLinkService) {
        this._appStore.select('currentStore').subscribe(store => this.currentStore = store);
        this.channels = this.storeService.getStoreChannels(
            this.currentStore.id,
            Object.assign(new ChannelsRequestParams,
                {status: 'installed'})
        )
            .map(({_embedded}) => _embedded.channel.map(({_embedded: {channel}}) => channel));

        this.linkToSupportCenter = this.supportLinkService.supportLink;

    }

    hasChannelsPermissions() {
        return this.currentStore.permission.ads
            || this.currentStore.permission.affiliation
            || this.currentStore.permission.marketplaces
            || this.currentStore.permission.retargeting
            || this.currentStore.permission.shopbots
            || this.currentStore.permission.solomo;
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
