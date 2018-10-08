import { Component, Input, OnInit } from '@angular/core';
import { Channel } from '../../../core/entities/channel';
import { MatDialog } from '@angular/material';
import { ConnectIntlChannelDialogComponent } from '../../connect-intl-channel-dialog/connect-intl-channel-dialog.component';
import { InternationalAccountService } from '../../../core/services/international-account.service';
import { IntlRequestSuccessDialogComponent } from '../../intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from '../../request-failed-dialog/request-failed-dialog.component';
import { StoreChannel } from '../../../core/entities/store-channel';
import { AcceptChannelDialogComponent } from '../../accept-channel-dialog/accept-channel-dialog.component';

const MIN_ONLINE = 5;

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
    potentialTurnoverValues = [100000, 50000, 25000, 10000, 7500, 5000, 2500, 1000, 500];

    clientsConnected: number;

    constructor(protected dialog: MatDialog,
                protected internationalAccountService: InternationalAccountService) {
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
        const value = this.channel.stats && this.channel.stats.turnoverAverage || 0;
        return this.potentialTurnoverValues.find(item => value >= item)
            || this.potentialTurnoverValues[this.potentialTurnoverValues.length - 1];
    }

    findConnectedClients(connected, total) {

        if (!connected || !total) {
            return MIN_ONLINE;
        }

        // we use 10 to round the value to the number, multiple of 10 (10, 20, 30, ...)
        const value = connected / total * 10;

        if (value < 1) {
            return MIN_ONLINE;
        } else {
            return Math.floor(value) * 10;
        }
    }

}
