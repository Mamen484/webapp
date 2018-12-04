import { Component, Input, OnInit } from '@angular/core';
import { Channel } from 'sfl-shared/entities';
import { MatDialog } from '@angular/material';
import { ConnectIntlChannelDialogComponent } from '../../connect-intl-channel-dialog/connect-intl-channel-dialog.component';
import { InternationalAccountService } from '../../../core/services/international-account.service';
import { IntlRequestSuccessDialogComponent } from '../../intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from '../../request-failed-dialog/request-failed-dialog.component';
import { StoreChannel } from 'sfl-shared/entities';
import { AcceptChannelDialogComponent } from '../../accept-channel-dialog/accept-channel-dialog.component';
import { ChannelStorageService, MIN_ONLINE, MIN_TURNOVER } from '../../../core/services/channel-storage.service';
import { get } from 'lodash';

@Component({
    selector: 'sf-suggested-channel',
    templateUrl: './suggested-channel.component.html',
    styleUrls: ['./suggested-channel.component.scss']
})
export class SuggestedChannelComponent implements OnInit {

    @Input() channel: StoreChannel;
    @Input() internationalMode = false;
    @Input() firstChannel = false;
    @Input() currency: string;

    potentialTurnover: number;
    clientsConnected: number;

    constructor(protected dialog: MatDialog,
                protected internationalAccountService: InternationalAccountService,
                protected channelStorage: ChannelStorageService) {
    }

    ngOnInit() {
        this.initializeStats();
        this.potentialTurnover = this.findPotentialTurnover();

    }

    showInternationalChannelDialog() {
        let dialogRef = this.dialog.open(ConnectIntlChannelDialogComponent);
        dialogRef.afterClosed().subscribe((agree: boolean) => {
            if (!agree) {
                return;
            }
            this.internationalAccountService.sendInternationalAccountRequest().subscribe(
                () => this.dialog.open(IntlRequestSuccessDialogComponent),
                () => this.dialog.open(RequestFailedDialogComponent)
            );
        });
    }

    getChannelLink(channel: Channel) {
        return channel.type === 'marketplace'
            ? `/${channel.name}`
            : `/${channel.type}/manage/${channel.name}`;
    }

    openAcceptChannelDialog() {
        this.dialog.open(AcceptChannelDialogComponent, {
            data: {
                logo: this.channel._embedded.channel._links.image.href,
                link: this.getChannelLink(this.channel._embedded.channel),
            }
        });
    }

    protected initializeStats() {
        const stats = this.channel.stats || {};
        this.clientsConnected = this.findConnectedClients(stats.connectedStores, stats.totalStores);
    }

    protected findPotentialTurnover() {
        const turnover = this.channel.stats && this.channel.stats.turnoverAverage || 0;
        return turnover < MIN_TURNOVER
            ? this.channelStorage.getGeneratedTurnover(get(this.channel, ['_embedded', 'channel', 'id'], this.channel.id))
            : turnover;
    }

    findConnectedClients(connected, total) {

        if (!connected || !total) {
            return this.channelStorage.getGeneratedOnline(this.channel.id);
        }

        const value = Math.round(connected / total * 100);

        return value < MIN_ONLINE
            ? this.channelStorage.getGeneratedOnline(this.channel.id)
            : value;
    }

}
