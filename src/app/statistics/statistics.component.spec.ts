import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { cloneDeep } from 'lodash';

import { StatisticsComponent } from './statistics.component';
import { statisticsMock } from '../../mocks/statistics-mock';
import { ChannelsRequestParams, PagedResponse, StoreChannel } from 'sfl-shared/entities';
import { MatDialog } from '@angular/material';
import { aggregatedUserInfoMock } from '../../mocks/agregated-user-info-mock';
import { StoreService } from 'sfl-shared/services';
import { storeChannelMock } from '../../mocks/store-channel.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimelineService } from '../core/services/timeline.service';
import { TimelineEvent } from '../core/entities/timeline-event';

describe('StatisticsComponent', () => {
    let component: StatisticsComponent;
    let fixture: ComponentFixture<StatisticsComponent>;
    let channelServiceMock;
    let timelineService: jasmine.SpyObj<TimelineService>;
    let exports$: Subject<PagedResponse<{ timeline: TimelineEvent[] }>>;

    beforeEach(async(() => {
        channelServiceMock = jasmine.createSpyObj('ChannelServive spy', ['getStoreChannels', 'getStatistics', 'getStoreCharge']);

        channelServiceMock.getStoreChannels.and.returnValue(of(storeChannelMock));
        channelServiceMock.getStatistics.and.returnValue(of(statisticsMock));
        channelServiceMock.getStoreCharge.and.returnValue(of({}));
        timelineService = jasmine.createSpyObj('TimelineService spy', ['getEvents']);
        exports$ = new Subject();
        timelineService.getEvents.and.returnValue(exports$);
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                StatisticsComponent,
            ],
            providers: [{
                provide: Store, useValue: {
                    select: param => param === 'currentStore'
                        ? of(aggregatedUserInfoMock._embedded.store[0])
                        : of(statisticsMock)
                }
            },
                {provide: StoreService, useValue: channelServiceMock},
                {provide: MatDialog, useValue: {}},
                {provide: TimelineService, useValue: timelineService},
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
            exports$.next({_embedded: {timeline: []}});
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
            exports$.next({_embedded: {timeline: []}});
            expect(component.channels.page).toEqual(3);
        });

        it('should set the number of pages, taking into account how many channels will load on scroll', () => {
            exports$.next({_embedded: {timeline: []}});
            expect(component.channels.pages).toEqual(17);
        });

        it('should initialize channel.lastExports', () => {
            exports$.next({
                _embedded: {
                    timeline: [
                        <any>{_embedded: {channel: {id: 1}}, occurredAt: 'some_date'},
                        <any>{_embedded: {channel: {id: 3}}, occurredAt: 'some_date2'},
                    ]
                }
            });
            expect((<StoreChannel>component.channels._embedded.channel.find(({id}) => id === 1)).lastExport).toBe('some_date');
            expect((<StoreChannel>component.channels._embedded.channel.find(({id}) => id === 3)).lastExport).toBe('some_date2');
        });
    });

    describe('scroll', () => {

        beforeEach(() => {
            exports$.next({_embedded: {timeline: []}});
            timelineService.getEvents.and.returnValue(of({_embedded: {timeline: []}}));
        });
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
                of(Object.assign({}, storeChannelMock, {
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
        beforeEach(() => {
            exports$.next({_embedded: {timeline: []}});
            timelineService.getEvents.and.returnValue(of({_embedded: {timeline: []}}));
        });
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
            // first one - for initialization, second one - apply filter
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(3);
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


    describe('internationalMode', () => {

        beforeEach(() => {
            exports$.next({_embedded: {timeline: []}});
            timelineService.getEvents.and.returnValue(of({_embedded: {timeline: []}}));
        });

        it('should set internationalMode to false when the filter.country is not set', () => {
            expect(component.filterState.country).toEqual('');
            expect(component.internationalMode).toEqual(false);
        });

        it('should be set to true when the filter.country differ from store.country', () => {
            component.filterState.country = 'pt';
            component.onApplyFilter();
            expect(component.internationalMode).toEqual(true);
        });

        it('should be reset to false when the filter.country changes to equal store.country', () => {
            component.filterState.country = 'pt';
            component.onApplyFilter();
            expect(component.internationalMode).toEqual(true);
            component.filterState.country = 'fr';
            component.onApplyFilter();
            expect(component.internationalMode).toEqual(false);
        });

        it('should be reset to false when the filter.country changes to empty string', () => {
            component.filterState.country = 'pt';
            component.onApplyFilter();
            expect(component.internationalMode).toEqual(true);
            component.filterState.country = '';
            component.onApplyFilter();
            expect(component.internationalMode).toEqual(false);
        });
    });

    describe('foreignChannels', () => {

        beforeEach(() => {
            exports$.next({_embedded: {timeline: []}});
            timelineService.getEvents.and.returnValue(of({_embedded: {timeline: []}}));
        });

        it('should be set to false on getStoreChannels call when country filter is not applied', () => {
            component.filterState.country = undefined;
            component.onApplyFilter();
            expect(channelServiceMock.getStoreChannels.calls.mostRecent().args[2]).toEqual(false);
        });

        it('should be set to false on getStoreChannels call when country filter equals to the store country', () => {
            component.filterState.country = 'fr';
            component.onApplyFilter();
            expect(channelServiceMock.getStoreChannels.calls.mostRecent().args[2]).toEqual(false);
        });

        it('should be set to false on getStoreChannels after onScroll() call when country filter equals to the store country', () => {
            component.filterState.country = 'fr';
            component.onScroll();
            expect(channelServiceMock.getStoreChannels.calls.mostRecent().args[2]).toEqual(false);
        });

        it('should be set to true on getStoreChannels call when country filter differs with the store country', () => {
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(1); // initialization call
            component.filterState.country = 'us';
            component.onApplyFilter();
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(2);
            expect(channelServiceMock.getStoreChannels.calls.mostRecent().args[2]).toEqual(true);
            component.onScroll();
            expect(channelServiceMock.getStoreChannels).toHaveBeenCalledTimes(3);
            expect(channelServiceMock.getStoreChannels.calls.mostRecent().args[2]).toEqual(true);
        });
    });

});
