import {map} from 'rxjs/operators';
import { Component } from '@angular/core';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Store } from '../core/entities/store';
import { Observable } from 'rxjs';
import { StoreChannelDetails } from '../core/entities/store-channel-details';
import { StoreService } from '../core/services/store.service';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';
import { WindowRefService } from '../core/services/window-ref.service';
import { Channel } from '../core/entities/channel';
import { SupportLinkService } from '../core/services/support-link.service';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
    selector: 'sf-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    currentStore: Store;
    channels: Observable<StoreChannelDetails[]>;
    linkToSupportCenter;
    hideTooltips = false;

    constructor(protected _appStore: AppStore<AppState>,
                protected storeService: StoreService,
                protected windowRef: WindowRefService,
                protected supportLinkService: SupportLinkService,
                protected media: ObservableMedia) {
        this._appStore.select('currentStore').subscribe(store => this.currentStore = store);
        this.channels = this.storeService.getStoreChannels(
            this.currentStore.id,
            Object.assign(new ChannelsRequestParams,
                {status: 'installed'})
        ).pipe(
            map(({_embedded}) => _embedded.channel.map(({_embedded: {channel}}) => channel)));

        this.linkToSupportCenter = this.supportLinkService.supportLink;
        this.media.subscribe(() => this.hideTooltips = this.media.isActive('xs'));
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
