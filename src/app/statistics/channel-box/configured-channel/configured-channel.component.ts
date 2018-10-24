import { Component, Input, OnInit } from '@angular/core';
import { StoreChannel } from '../../../core/entities/store-channel';
import { Channel } from '../../../core/entities/channel';

@Component({
    selector: 'sf-configured-channel',
    templateUrl: './configured-channel.component.html',
    styleUrls: ['./configured-channel.component.scss'],
})
export class ConfiguredChannelComponent implements OnInit {

    @Input() channel: StoreChannel;
    @Input() hasStatisticsPermission = false;

    channelsOnline: number;

    ngOnInit() {
        this.initializeOnline();
    }

    goToChannelLink(channel: Channel) {
        return channel.type === 'marketplace'
            ? `/${channel.name}`
            : `/${channel.type}/manage/${channel.name}`;
    }

    // @TODO: improve performance of change detection
    statisticsExistsFor(property) {
        return Boolean(this.channel.statistics) && typeof this.channel.statistics[property] === 'number';
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
}
