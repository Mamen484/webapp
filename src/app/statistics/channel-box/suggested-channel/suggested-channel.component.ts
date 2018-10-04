import { Component, Input, OnInit } from '@angular/core';
import { Channel } from '../../../core/entities/channel';
import { MatDialog } from '@angular/material';
import { ConnectIntlChannelDialogComponent } from '../../connect-intl-channel-dialog/connect-intl-channel-dialog.component';
import { InternationalAccountService } from '../../../core/services/international-account.service';
import { IntlRequestSuccessDialogComponent } from '../../intl-request-success-dialog/intl-request-success-dialog.component';
import { RequestFailedDialogComponent } from '../../request-failed-dialog/request-failed-dialog.component';
import { StoreChannel } from '../../../core/entities/store-channel';
import { AcceptChannelDialogComponent } from '../../accept-channel-dialog/accept-channel-dialog.component';

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
    hasStats = false;

    constructor(protected dialog: MatDialog,
                protected internationalAccountService: InternationalAccountService) {
    }

    ngOnInit() {
        this.initializeStats();
        if (this.hasStats) {
            this.potentialTurnover = this.findPotentialTurnover(this.channel.stats.turnoverAverage);
        }

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
        const stats = this.channel.stats;
        this.hasStats = Boolean(stats && stats.totalStores && stats.connectedStores && stats.turnoverAverage);
        if (this.hasStats) {
            this.clientsConnected = this.findConnectedClients(this.channel.stats.connectedStores, this.channel.stats.totalStores);
        }
    }

    protected findPotentialTurnover(value) {
        return this.potentialTurnoverValues.find(item => value >= item) || this.potentialTurnoverValues[this.potentialTurnoverValues.length - 1];
    }

    findConnectedClients(connected, total) {

        // we use 10 to round the value to the number, multiple of 10 (10, 20, 30, ...)
        const value = connected / total * 10;

        if (value < 1) {
            return 5;
        } else {
            return Math.floor(value) * 10;
        }
    }

}
