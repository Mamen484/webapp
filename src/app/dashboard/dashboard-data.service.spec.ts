import { TestBed } from '@angular/core/testing';

import { DashboardDataService } from './dashboard-data.service';
import { ConnectedChannelsDataService } from '../channels/channels-list/connected-channels/connected-channels-data.service';
import { StoreService, TimelineService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { OrdersService } from '../core/services/orders.service';
import { FeedService } from '../core/services/feed.service';
import { EMPTY, of } from 'rxjs';
import { ChannelsRequestParams, TimelineEventAction, TimelineEventName } from 'sfl-shared/entities';
import { OrdersFilter } from '../core/entities/orders/orders-filter';
import { OrderErrorType } from '../core/entities/orders/order-error-type.enum';

describe('DashboardDataService', () => {
    let service: DashboardDataService;
    let channelDataService: jasmine.SpyObj<ConnectedChannelsDataService>;
    let feedService: jasmine.SpyObj<FeedService>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let storeService: jasmine.SpyObj<StoreService>;
    let timelineService: jasmine.SpyObj<TimelineService>;

    beforeEach(() => {
        channelDataService = jasmine.createSpyObj(['getChannels', 'getStatistics']);
        feedService = jasmine.createSpyObj(['fetchRecommendations']);
        appStore = jasmine.createSpyObj(['select']);
        ordersService = jasmine.createSpyObj(['fetchOrdersList']);
        storeService = jasmine.createSpyObj(['fetchStatistics']);
        timelineService = jasmine.createSpyObj(['getEvents']);

        TestBed.configureTestingModule({
            providers: [
                {provide: ConnectedChannelsDataService, useValue: channelDataService},
                {provide: FeedService, useValue: feedService},
                {provide: Store, useValue: appStore},
                {provide: OrdersService, useValue: ordersService},
                {provide: StoreService, useValue: storeService},
                {provide: TimelineService, useValue: timelineService},
            ]
        });
        service = TestBed.inject(DashboardDataService);
    });

    beforeEach(() => {
        channelDataService.getChannels.and.returnValue(EMPTY);
        channelDataService.getStatistics.and.returnValue(EMPTY);
        feedService.fetchRecommendations.and.returnValue(EMPTY);
        storeService.fetchStatistics.and.returnValue(EMPTY);
        timelineService.getEvents.and.returnValue(EMPTY);
        ordersService.fetchOrdersList.and.returnValue(EMPTY);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch connected channels data', () => {
        service.getData().subscribe();
        expect(channelDataService.getChannels).toHaveBeenCalledWith(
            Object.assign(new ChannelsRequestParams(), {
                page: 1, limit: 200, searchQuery: '', country: '', type: '', segment: '', status: ''
            }));
    });

    it('should fetch connected statisitcs data', () => {
        service.getData().subscribe();
        expect(channelDataService.getStatistics).toHaveBeenCalled();
    });

    it('should fetch 3 last channel recommedations', () => {
        service.getData().subscribe();
        expect(feedService.fetchRecommendations).toHaveBeenCalledWith({limit: 3});
    });

    it('should fetch store statistics', () => {
        service.getData().subscribe();
        expect(storeService.fetchStatistics).toHaveBeenCalled();
    });

    it('should fetch the number of orders for the last month', () => {
        service.getData().subscribe();
        expect(ordersService.fetchOrdersList.calls.first().args[0].limit).toBe('1');
        expect(ordersService.fetchOrdersList.calls.first().args[0].since.getTime() + 1000).toBeGreaterThan(OrdersFilter.aMonthBefore().getTime());
    });

    it('should fetch finish and error timeline import events', () => {
        service.getData().subscribe();
        expect(timelineService.getEvents).toHaveBeenCalled();
        expect(timelineService.getEvents.calls.mostRecent().args[0].action).toEqual([TimelineEventAction.finish, TimelineEventAction.error]);
        expect(timelineService.getEvents.calls.mostRecent().args[0].name).toEqual([TimelineEventName.import]);
    });

    it('should fetch orders with acknowledgement error for the last week', () => {
        service.getData().subscribe();
        expect(ordersService.fetchOrdersList.calls.argsFor(1)[0].limit).toBe('1');
        expect(ordersService.fetchOrdersList.calls.argsFor(1)[0].error).toBe(OrderErrorType.acknowledge);
        expect(ordersService.fetchOrdersList.calls.argsFor(1)[0].since.getTime() + 1000).toBeGreaterThan(OrdersFilter.aWeekBefore().getTime());
    });

    it('should fetch orders with shipping error for the last week', () => {
        service.getData().subscribe();
        expect(ordersService.fetchOrdersList.calls.argsFor(2)[0].limit).toBe('1');
        expect(ordersService.fetchOrdersList.calls.argsFor(2)[0].error).toBe(OrderErrorType.ship);
        expect(ordersService.fetchOrdersList.calls.argsFor(2)[0].since.getTime() + 1000).toBeGreaterThan(OrdersFilter.aWeekBefore().getTime());
    });

    it('should cache the result', () => {
        service.getData().subscribe();
        service.getData().subscribe();
        expect(timelineService.getEvents).toHaveBeenCalledTimes(1);
    });

    it('should transform an array of data into an object', async() => {
        channelDataService.getChannels.and.returnValue(of(<any>{}));
        channelDataService.getStatistics.and.returnValue(of(<any>{}));
        storeService.fetchStatistics.and.returnValue(of(<any>{}));
        timelineService.getEvents.and.returnValue(of(<any>{}));
        ordersService.fetchOrdersList.and.returnValue(of(<any>{}));
        feedService.fetchRecommendations.and.returnValue(of(<any>{}));
        const data = await service.getData().toPromise();
        expect(data).toEqual(<any>{
            connectedChannelsData: {},
            connectedChannelsStatistics: {},
            recommendedChannelsList: [],
            storeStatistics: {},
            ordersList: {},
            imports: {},
            importErrors: {},
            shippingErrors: {},
        });
    });


});
