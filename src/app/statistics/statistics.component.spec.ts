import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StatisticsComponent } from './statistics.component';
import { statisticsMock } from '../../mocks/statistics-mock';
import { SearchChannelsStubComponent } from '../../mocks/stubs/search-channels-stub.component';
import { StoreStatisticsStubComponent } from '../../mocks/stubs/store-statistics-stub.component';
import { ConfiguredChannelStubComponent } from '../../mocks/stubs/configured-channel-stub.component';
import { SuggestedChannelStubComponent } from '../../mocks/stubs/suggested-channel-stub.component';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';
import { MdCardModule, MdDialog } from '@angular/material';
import { aggregatedUserInfoMock } from '../../mocks/agregated-user-info-mock';
import { StoreService } from '../core/services/store.service';
import { storeChannelMock } from '../../mocks/store-channel.mock';

describe('StatisticsComponent', () => {
    let component: StatisticsComponent;
    let fixture: ComponentFixture<StatisticsComponent>;
    let channelServiceMock;

    beforeEach(async(() => {
        channelServiceMock = {
            getStoreChannels: jasmine.createSpy('getStoreChannels'),
            getStatistics: jasmine.createSpy('getStoreChannels'),
            getStoreCharge: jasmine.createSpy('getStoreChannels'),
        };

        channelServiceMock.getStoreChannels.and.callFake(params => Observable.of(storeChannelMock));
        channelServiceMock.getStatistics.and.callFake(params => Observable.of(statisticsMock));
        channelServiceMock.getStoreCharge.and.callFake(params => Observable.of({}));
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                InfiniteScrollModule,
                FlexLayoutModule,
                MdCardModule,
            ],
            declarations: [
                StatisticsComponent,
                SearchChannelsStubComponent,
                StoreStatisticsStubComponent,
                ConfiguredChannelStubComponent,
                SuggestedChannelStubComponent
            ],
            providers: [{
                provide: Store, useValue: {
                    select: param => param === 'currentStore'
                        ? Observable.of(aggregatedUserInfoMock._embedded.store[0])
                        : Observable.of(statisticsMock)
                }
            },
                {provide: StoreService, useValue: channelServiceMock},
                {provide: MdDialog, useValue: {}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatisticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('initialization', () => {
        it('should load initial channels', () => {
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(1);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(0)[1]).page).toEqual(1);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(0)[1]).limit).toEqual(18);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(0)[1]).searchQuery).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(0)[1]).segment).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(0)[1]).country).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(0)[1]).type).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(0)[1]).status).toEqual('');
            expect(component.infiniteScrollDisabled).toEqual(false);
        });

        it('should set the current page to 3, because 3 first pages we loaded within one request to initialize the page', () => {
            expect(component.channels.page).toEqual(3);
        });

        it('should set the number of pages, taking into account how many channels will load on scroll', () => {
            expect(component.channels.pages).toEqual(17);
        });
    });

    describe('scroll', () => {
        it('should load 6 new channels on scroll', () => {
            component.onScroll();
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(2);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).page).toEqual(4);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).limit).toEqual(6);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).searchQuery).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).segment).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).country).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).type).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).status).toEqual('');

            component.onScroll();
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(3);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(2)[1]).page).toEqual(2);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(2)[1]).limit).toEqual(6);
        });

        it('should set processing to true while loading channels, then reset it to false', () => {
            let spy = jasmine.createSpy('set processing');
            let processingValue = false;
            Object.defineProperty(component, 'processing', {
                get: () => processingValue,
                set: value => {
                    processingValue = value;
                    spy(value)
                }
            });
            component.onScroll();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy.calls.argsFor(0)[0]).toEqual(true);
            expect(spy.calls.argsFor(1)[0]).toEqual(false);
        });

        it('should not load new records, if processing is true, that means that new channels are being loaded', () => {
            component.processing = true;
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(1); // all was made on initialization
            component.onScroll();
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(1); // no new calls were made
        });
        it('should disable infinite scroll when all pages are loaded', () => {
            channelServiceMock.getStoreChannels.and.returnValue(
                Observable.of(Object.assign({}, storeChannelMock, {
                    page: 17
                })));
            component.onScroll();
            expect(component.channels.page).toEqual(17);
            expect(component.channels.pages).toEqual(17);
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(2);
            expect(component.infiniteScrollDisabled).toEqual(true);
            // try to scroll one more time
            component.onScroll();
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(2);
            expect(component.infiniteScrollDisabled).toEqual(true);
        });
    });

    describe('filtering', () => {
        it('should clear channels and call for new channels with appropriate filters', () => {
            component.filterState.type = 'ads';
            component.filterState.country = 'it';
            component.filterState.segment = 'appliances';
            component.onApplyFilter();
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(2); // first one - for initialization
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).page).toEqual(1);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).limit).toEqual(18);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).searchQuery).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).segment).toEqual('appliances');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).country).toEqual('it');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).type).toEqual('ads');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(1)[1]).status).toEqual('');
            expect(component.channels._embedded.channel.length).toBeLessThanOrEqual(18);
        });

        it('should save filters on scrolling', () => {
            component.filterState.type = 'ads';
            component.filterState.country = 'fr';
            component.filterState.searchQuery = 'amaz';
            component.onApplyFilter();
            component.onScroll();
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(3); // first one - for initialization, second one - apply filter
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(2)[1]).page).toEqual(4);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(2)[1]).limit).toEqual(6);
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(2)[1]).searchQuery).toEqual('amaz');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(2)[1]).segment).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(2)[1]).country).toEqual('fr');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(2)[1]).type).toEqual('ads');
            expect((<ChannelsRequestParams>channelServiceMock.getStoreChannels.calls.argsFor(2)[1]).status).toEqual('');
            expect(component.channels._embedded.channel.length).toBeLessThanOrEqual(24);
        });

        it('should set processingFilters to true then to false when on onApplyFilter', () => {
            let spy = jasmine.createSpy('set processingFilters');
            let processingValue = false;
            Object.defineProperty(component, 'processingFilters', {
                get: () => processingValue,
                set: value => {
                    processingValue = value;
                    spy(value)
                }
            });
            component.onApplyFilter();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy.calls.argsFor(0)[0]).toEqual(true);
            expect(spy.calls.argsFor(1)[0]).toEqual(false);
        });
    });

    it('should set internationalMode to false when the filter.country is not set', () => {
        expect(component.filterState.country).toEqual('');
        expect(component.internationalMode).toEqual(false);
    });

    it('should set internationalMode to true when the filter.country differ from store.country', () => {
        component.filterState.country = 'pt';
        component.onApplyFilter();
        expect(component.internationalMode).toEqual(true);
    });

    it('should reset internationalMode to false when the filter.country changes to equal store.country', () => {
        component.filterState.country = 'pt';
        component.onApplyFilter();
        expect(component.internationalMode).toEqual(true);
        component.filterState.country = 'fr';
        component.onApplyFilter();
        expect(component.internationalMode).toEqual(false);
    });

    it('should reset internationalMode to false when the filter.country changes to empty string', () => {
        component.filterState.country = 'pt';
        component.onApplyFilter();
        expect(component.internationalMode).toEqual(true);
        component.filterState.country = '';
        component.onApplyFilter();
        expect(component.internationalMode).toEqual(false);
    });
});
