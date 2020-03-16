import { Component } from '@angular/core';
import { flatMap, map, take, tap } from 'rxjs/operators';
import { Observable, Subject, zip } from 'rxjs';
import { AppState } from '../core/entities/app-state';
import { Store as AppStore } from '@ngrx/store';
import { ChannelsRequestParams, ChannelsResponse, PagedResponse, Statistics, Store, StoreChannel } from 'sfl-shared/entities';
import { StoreService } from 'sfl-shared/services';
import { MatDialog } from '@angular/material';
import { cloneDeep } from 'lodash';
import { TimelineEvent } from '../core/entities/timeline-event';
import { TimelineFilter } from '../core/entities/timeline-filter';
import { TimelineEventAction } from '../core/entities/timeline-event-action.enum';
import { TimelineEventName } from '../core/entities/timeline-event-name.enum';
import { TimelineService } from '../core/services/timeline.service';
import { environment } from '../../environments/environment';

const LOAD_CHANNELS_COUNT = 6;
const maxEvents = 200;
/**
 * load pages on page initialization
 * @type {number}
 */
const INITIAL_PAGES_AMOUNT = 3;

@Component({
    selector: 'sf-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

    public statistics: Statistics;
    public channels: ChannelsResponse = <any>{_embedded: {channel: []}};
    infiniteScrollDisabled = false;
    processing = false;
    processingFilters = false;
    internationalMode = false;
    filterState = new ChannelsRequestParams();
    haveNoChannels = false;
    hasStatisticsPermission = false;

    exportsLoaded = new Subject<TimelineEvent[]>();

    showCovid19Banner = environment.showCovid19Banner;

    constructor(protected appStore: AppStore<AppState>,
                protected storeService: StoreService,
                protected dialog: MatDialog,
                protected timelineService: TimelineService) {

        this.appStore.select('currentStore').pipe(
            tap(() => this.displayPageLoading()),
            tap((currentStore: Store) => this.hasStatisticsPermission = Boolean(currentStore.permission.statistics)),
            flatMap(currentStore => this.fetchData(currentStore))
        )
            .subscribe(([statistics, channels, exports]) => {
                this.statistics = statistics;
                if (!this.statistics._embedded) {
                    this.statistics._embedded = {channel: []};
                } else if (!Array.isArray(this.statistics._embedded.channel)) {
                    this.statistics._embedded.channel = [];
                }
                this.initialize(channels, exports);
                this.processing = false;

                this.appStore.select('currentStore').pipe(take(1)).subscribe(currentStore => {
                    if (currentStore.feed.source
                        && currentStore.feed.source.toLowerCase() === 'shopify'
                        && !channels._embedded.channel.filter(ch => ch.installed).length) {
                        this.haveNoChannels = true;
                    }
                })
            });
    }


    onScroll() {
        if (!this.canScroll()) {
            return;
        }
        this.processing = true;
        this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.storeService.getStoreChannels(
                store.id,
                this.getFilterState(),
                this.isForeignCountry(store.country)
            ))
        )
            .subscribe(data => {
                this.updateSuggestedChannels(data);
                this.processing = false;
                this.infiniteScrollDisabled = data.page >= data.pages;
            });
    }

    onApplyFilter() {
        this.processingFilters = true;
        this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(currentStore =>
                zip(
                    this.storeService.getStoreChannels(
                        currentStore.id,
                        Object.assign({}, this.filterState, {limit: LOAD_CHANNELS_COUNT * INITIAL_PAGES_AMOUNT}),
                        this.isForeignCountry(currentStore.country)
                    ),
                    this.fetchExports(),
                )
            )
        )
            .subscribe(([channels, exports]) => this.initialize(channels, exports));
    }

    resetFilter() {
        this.filterState = new ChannelsRequestParams();
        this.onApplyFilter();
        return false;
    }

    protected canScroll() {
        return !this.processing && this.channels.page < this.channels.pages;
    }

    protected isForeignCountry(country) {
        return Boolean(this.filterState.country && country.toLowerCase() !== this.filterState.country.toLowerCase());
    }

    protected updateSuggestedChannels({page, _embedded}: PagedResponse<{ channel: StoreChannel[] }>) {
        this.channels.page = page;
        this.channels._embedded.channel.push(..._embedded.channel.map((channel: StoreChannel) => {
            if (channel.installed) {
                let installedChannel = Object.assign({},
                    channel,
                    {statistics: this.statistics._embedded.channel.find(ch => ch.id === channel.id)}
                );
                if (installedChannel.statistics) {
                    installedChannel.statistics.currency = this.statistics.currency;
                }
                return installedChannel;
            }
            return channel;
        }));

    }

    protected getFilterState() {
        return Object.assign({}, this.filterState, {
            page: this.channels.page + 1,
            limit: LOAD_CHANNELS_COUNT
        });
    }

    protected initialize(data, exports: TimelineEvent[]) {

        this.channels = cloneDeep(data);
        this.channels._embedded.channel.forEach((channel: StoreChannel) => {
            if (channel.installed) {
                channel.statistics = this.statistics._embedded.channel.find(ch => ch.id === channel.id);
                if (channel.statistics) {
                    channel.statistics.currency = this.statistics.currency;
                }
                const lastExport = exports.find(event => channel.id === event._embedded.channel.id);
                if (lastExport) {
                    channel.lastExport = lastExport.occurredAt;
                    channel.lastExportFailed = lastExport.action === TimelineEventAction.error;
                }
            }
        });
        this.channels.page = INITIAL_PAGES_AMOUNT;
        this.channels.pages = Math.ceil(this.channels.total / LOAD_CHANNELS_COUNT);
        this.processingFilters = false;
        this.infiniteScrollDisabled = this.channels.page >= this.channels.pages;
        this.appStore.select('currentStore').pipe(take(1)).subscribe((store: Store) => {
            this.internationalMode = this.isForeignCountry(store.country);
        });
    }

    protected displayPageLoading() {
        this.statistics = undefined;
        this.channels = <any>{_embedded: {channel: []}};
        this.processing = true;
    }

    protected fetchData(currentStore) {
        return zip(
            this.storeService.getStatistics(currentStore.id),
            this.storeService.getStoreChannels(
                currentStore.id,
                Object.assign({}, this.filterState, {limit: LOAD_CHANNELS_COUNT * INITIAL_PAGES_AMOUNT})
            ),
            this.fetchExports(),
        )
    }

    protected fetchExports(): Observable<TimelineEvent[]> {
        const filter = new TimelineFilter();
        filter.action = [TimelineEventAction.finish, TimelineEventAction.error];
        filter.name = [TimelineEventName.export];

        return this.timelineService.getEvents(filter, maxEvents).pipe(
            map(response => response._embedded.timeline)
        );
    }
}
