import { Component, Input, OnInit } from '@angular/core';
import { StoreChannel } from 'sfl-shared/entities';
import { ChannelLinkService } from '../../../core/services/channel-link.service';

@Component({
    selector: 'sf-configured-channel',
    templateUrl: './configured-channel.component.html',
    styleUrls: ['./configured-channel.component.scss'],
})
export class ConfiguredChannelComponent implements OnInit {

    @Input() channel: StoreChannel;
    @Input() hasStatisticsPermission = false;

    revenueStatisticsAvailable = false;

    channelsOnline: number;

    constructor(protected channelLinkService: ChannelLinkService) {
    }

    goToChannel() {
        this.channelLinkService.navigateToChannel(this.channel._embedded.channel);
    }

    ngOnInit() {
        this.initializeOnline();
        this.revenueStatisticsAvailable = this.statisticsExistsFor('revenue');
    }

    protected initializeOnline() {
        if (!this.statisticsExistsFor('exported')
            || !this.statisticsExistsFor('selected')
            || this.channel.statistics.selected === 0) {
            return;
        }

        this.channelsOnline = Math.round(
            Number(this.channel.statistics.exported)
            / Number(this.channel.statistics.selected)
            * 100);

        if (this.channelsOnline > 100) {
            this.channelsOnline = 100;
        }
    }

    protected statisticsExistsFor(property) {
        return Boolean(this.channel.statistics) && typeof this.channel.statistics[property] === 'number';
    }
}
