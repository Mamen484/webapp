import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StatisticsComponent } from './statistics.component';
import { ChannelService } from '../core/services/channel.service';
import { channelsStaticMock } from '../../mocks/channels-mock';
import { statisticsMock } from '../../mocks/statistics-mock';
import { SearchChannelsStubComponent } from '../../mocks/stubs/search-channels-stub.component';
import { StoreStatisticsStubComponent } from '../../mocks/stubs/store-statistics-stub.component';
import { ConfiguredChannelStubComponent } from '../../mocks/stubs/configured-channel-stub.component';
import { SuggestedChannelStubComponent } from '../../mocks/stubs/suggested-channel-stub.component';
import { ChannelsRequestParams } from '../core/entities/channels-request-params';
import { MdCardModule } from '@angular/material';

describe('StatisticsComponent', () => {
    let component: StatisticsComponent;
    let fixture: ComponentFixture<StatisticsComponent>;
    let channelServiceMock;

    beforeEach(async(() => {
        channelServiceMock = {getChannels: jasmine.createSpy('getChannels')};
        channelServiceMock.getChannels.and.callFake(params => Observable.of(channelsStaticMock(params)));
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
            providers: [
                {provide: Store, useValue: {select: () => Observable.of(statisticsMock)}},
                {provide: ChannelService, useValue: channelServiceMock}
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
            expect(channelServiceMock.getChannels).toHaveBeenCalledTimes(1);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(0)[0]).page).toEqual(1);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(0)[0]).limit).toEqual(18);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(0)[0]).searchQuery).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(0)[0]).segment).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(0)[0]).country).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(0)[0]).type).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(0)[0]).status).toEqual('');
            expect(component.channels._embedded.channel.length).toEqual(18);
            expect(component.infiniteScrollDisabled).toEqual(false);
        });

        it('should set the current page to 3, because 3 first pages we loaded within one request to initialize the page', () => {
            expect(component.channels.page).toEqual(3);
        });

        it('should set the number of pages, taking into account how many channels will load on scroll', () => {
            expect(component.channels.pages).toEqual(11);
        });
    });

    describe('scroll', () => {
        it('should load 6 new channels on scroll', () => {
            component.onScroll();
            expect(channelServiceMock.getChannels).toHaveBeenCalledTimes(2);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).page).toEqual(4);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).limit).toEqual(6);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).searchQuery).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).segment).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).country).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).type).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).status).toEqual('');
            expect(component.channels._embedded.channel.length).toEqual(24);

            component.onScroll();
            expect(channelServiceMock.getChannels).toHaveBeenCalledTimes(3);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(2)[0]).page).toEqual(5);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(2)[0]).limit).toEqual(6);
            expect(component.channels._embedded.channel.length).toEqual(30);
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
            expect(channelServiceMock.getChannels).toHaveBeenCalledTimes(1); // all was made on initialization
            component.onScroll();
            expect(channelServiceMock.getChannels).toHaveBeenCalledTimes(1); // no new calls were made
        });
        it('should disable infinite scroll when all pages are loaded', () => {
            component.onScroll(); // page = 4
            component.onScroll(); // page = 5
            component.onScroll(); // page = 6
            component.onScroll(); // page = 7
            component.onScroll(); // page = 8
            component.onScroll(); // page = 9
            component.onScroll(); // page = 10
            component.onScroll(); // page = 11
            expect(component.channels.page).toEqual(11);
            expect(component.channels.pages).toEqual(11);
            expect(channelServiceMock.getChannels).toHaveBeenCalledTimes(9);
            expect(component.infiniteScrollDisabled).toEqual(true);
            // try to scroll one more time
            component.onScroll(); // page = 11
            expect(channelServiceMock.getChannels).toHaveBeenCalledTimes(9);
            expect(component.channels.page).toEqual(11);
            expect(component.channels.pages).toEqual(11);
            expect(component.infiniteScrollDisabled).toEqual(true);
        });
    });

    describe('filtering', () => {
        it('should clear channels and call for new channels with appropriate filters', () => {
            component.filterState.type = 'ads';
            component.filterState.country = 'it';
            component.filterState.segment = 'appliances';
            component.onApplyFilter();
            expect(channelServiceMock.getChannels).toHaveBeenCalledTimes(2); // first one - for initialization
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).page).toEqual(1);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).limit).toEqual(18);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).searchQuery).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).segment).toEqual('appliances');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).country).toEqual('it');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).type).toEqual('ads');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(1)[0]).status).toEqual('');
            expect(component.channels._embedded.channel.length).toBeLessThanOrEqual(18);
        });

        it('should save filters on scrolling', () => {
            component.filterState.type = 'ads';
            component.filterState.country = 'fr';
            component.filterState.searchQuery = 'amaz';
            component.onApplyFilter();
            component.onScroll();
            expect(channelServiceMock.getChannels).toHaveBeenCalledTimes(3); // first one - for initialization, second one - apply filter
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(2)[0]).page).toEqual(4);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(2)[0]).limit).toEqual(6);
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(2)[0]).searchQuery).toEqual('amaz');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(2)[0]).segment).toEqual('');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(2)[0]).country).toEqual('fr');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(2)[0]).type).toEqual('ads');
            expect((<ChannelsRequestParams>channelServiceMock.getChannels.calls.argsFor(2)[0]).status).toEqual('');
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

        it('should enable/disable inifinite scroll when the filter is applied', () => {
            expect(component.infiniteScrollDisabled).toEqual(false);
            component.filterState.searchQuery = 'some unreal string azazazazazazazazza';
            component.onApplyFilter();
            expect(component.infiniteScrollDisabled).toEqual(true);
            component.resetFilter();
            expect(component.infiniteScrollDisabled).toEqual(false);
        });
    })
});
