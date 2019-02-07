import { Component, Input } from '@angular/core';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Channel, Store, StoreChannelDetails } from 'sfl-shared/entities';
import { SflWindowRefService, StoreService } from 'sfl-shared/services';
import { SupportLinkService } from '../core/services/support-link.service';
import { MediaObserver } from '@angular/flex-layout';

@Component({
    selector: 'sf-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    @Input() showExtendedSidenav = false;

    currentStore: Store;
    currentRoute;
    channels: StoreChannelDetails[];
    linkToSupportCenter;
    hideTooltips = false;

    constructor(protected appStore: AppStore<AppState>,
                protected storeService: StoreService,
                protected windowRef: SflWindowRefService,
                protected supportLinkService: SupportLinkService,
                protected media: MediaObserver) {
        this.appStore.select('currentStore').subscribe((store: Store) => {
            this.currentStore = store;
        });
        this.appStore.select('installedChannels').subscribe(channels => this.channels = channels);
        this.appStore.select('currentRoute').subscribe(currentRoute => this.currentRoute = currentRoute);

        this.linkToSupportCenter = this.supportLinkService.supportLink;
        this.media.media$.subscribe(() => this.hideTooltips = this.media.isActive('xs'));
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
