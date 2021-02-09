import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from 'sfl-shared/services';
import { ChannelsRequestParams, ChannelStatistics, StoreChannel } from 'sfl-shared/entities';
import { debounce, filter, map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { of, Subscription, timer } from 'rxjs';
import { ConnectedChannelsDataService } from './connected-channels-data.service';

export const searchDebounce = 300;
const minQueryLength = 2;

@Component({
    selector: 'sf-connected-channels',
    templateUrl: './connected-channels.component.html',
    styleUrls: ['./connected-channels.component.scss']
})
export class ConnectedChannelsComponent implements OnInit, OnDestroy {

    channels: StoreChannel[] = [];
    statistics: { [key: number]: ChannelStatistics };
    currency: string;
    filter = Object.assign(new ChannelsRequestParams(), {page: 1, limit: 20});
    loadingChannels = true;
    hasNextPage = true;
    searchControl = new FormControl();
    subscription = new Subscription();
    channelsSubscription;


    constructor(private changeDetectorRef: ChangeDetectorRef,
                private connectedDataService: ConnectedChannelsDataService) {
    }

    ngOnInit(): void {
        this.connectedDataService.getStatistics().subscribe(({statistics, currency}) => {
            this.statistics = statistics;
            this.currency = currency;
            this.loadChannels();
        })
        this.subscription.add(this.searchControl.valueChanges.pipe(
            debounce(searchQuery => searchQuery
                ? timer(searchDebounce).pipe(map(() => searchQuery))
                : of(searchQuery)
            ),
            filter(searchQuery => searchQuery.length >= minQueryLength || searchQuery === ''),
            tap(() => this.filter.page = 1)
        ).subscribe((searchQuery) => {
            this.filter.searchQuery = searchQuery;
            this.channels = [];
            this.hasNextPage = true;
            this.loadChannels();
        }));
    }

    clearSearch() {
        this.searchControl.setValue('');
    }

    onScroll() {
        if (!this.hasNextPage || this.loadingChannels) {
            return;
        }
        this.filter.page += 1;
        this.loadChannels()
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private loadChannels() {
        this.loadingChannels = true;
        if (this.channelsSubscription) {
            this.channelsSubscription.unsubscribe();
        }
        this.channelsSubscription = this.connectedDataService.getChannels(this.filter)
            .subscribe(({channels, page, pages}) => {
                this.channels = this.channels.concat(channels);
                this.loadingChannels = false;
                this.hasNextPage = page < pages;
                this.changeDetectorRef.detectChanges();
            });
        this.subscription.add(this.channelsSubscription);
    }

}
