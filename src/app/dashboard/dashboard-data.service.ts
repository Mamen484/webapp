import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable, of, zip } from 'rxjs';
import {
    Channel,
    ChannelsRequestParams,
    PagedResponse,
    Statistics,
    StoreChannel,
    TimelineEvent,
    TimelineEventAction,
    TimelineEventName,
    TimelineFilter
} from 'sfl-shared/entities';
import { catchError, map, publishReplay } from 'rxjs/operators';
import { ConnectedChannelsDataService } from '../channels/channels-list/connected-channels/connected-channels-data.service';
import { StoreService, TimelineService } from 'sfl-shared/services';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { OrdersFilter } from '../core/entities/orders/orders-filter';
import { OrdersService } from '../core/services/orders.service';
import { Order } from '../core/entities/orders/order';
import { OrderErrorType } from '../core/entities/orders/order-error-type.enum';
import { OrdersFilterPatch } from '../core/entities/orders/orders-filter-patch';
import { FeedService } from '../core/services/feed.service';

/**
 * Refactor all dashboard data into a single service to know when all the data is loaded for loading indication
 */

@Injectable({
    providedIn: 'root'
})
export class DashboardDataService {

    data$: ConnectableObservable<{
        connectedChannelsData: {
            channels: StoreChannel[],
            page: number,
            pages: number
        },
        connectedChannelsStatistics: {
            statistics: any,
            currency: string,
        },
        recommendedChannelsList: Channel[],
        storeStatistics: Statistics,
        ordersList: any,
        imports: any,
        importErrors: any,
        shippingErrors: any,
    }>;

    constructor(private connectedChannelDataService: ConnectedChannelsDataService,
                private appStore: Store<AppState>,
                private storeService: StoreService,
                private ordersService: OrdersService,
                private timelineService: TimelineService,
                private feedService: FeedService) {
    }

    getData() {
        if (!this.data$) {
            this.data$ = zip(
                        this.connectedChannelDataService.getChannels(
                            Object.assign(new ChannelsRequestParams(), {page: 1, limit: 200})
                        ),
                        this.connectedChannelDataService.getStatistics(),
                        this.feedService.fetchRecommendations({limit: 3}).pipe(
                            catchError(() => of(undefined)),
                            map((recommendationData) =>
                                recommendationData && recommendationData.count
                                    ? recommendationData._embedded.recommendation
                                        .map(recommendation => recommendation._embedded.channel)
                                    : []
                            ),
                        ),
                        this.storeService.fetchStatistics(),
                        this.ordersService.fetchOrdersList(new OrdersFilter({limit: '1', since: OrdersFilter.aMonthBefore()})),
                        this.fetchImports(),
                        this.fetchAcknowledgmentErrors(),
                        this.fetchShippingErrors()
                    ).pipe(
                map(([
                         connectedChannelsData,
                         connectedChannelsStatistics,
                         recommendedChannelsList,
                         storeStatistics,
                         ordersList,
                         imports,
                         importErrors,
                         shippingErrors,
                     ]) => ({
                    connectedChannelsData,
                    connectedChannelsStatistics,
                    recommendedChannelsList,
                    storeStatistics,
                    ordersList,
                    imports,
                    importErrors,
                    shippingErrors,
                })),
                publishReplay(),
            ) as ConnectableObservable<any>;
            this.data$.connect();
        }
        return this.data$;
    }

    protected fetchImports(): Observable<PagedResponse<{ timeline: TimelineEvent[] }>> {

        const filter = new TimelineFilter();
        filter.action = [TimelineEventAction.finish, TimelineEventAction.error];
        filter.name = [TimelineEventName.import];

        return this.timelineService.getEvents(filter, 1);
    }

    protected fetchAcknowledgmentErrors(): Observable<PagedResponse<{ order: Order[] }>> {
        const filter = new OrdersFilter();
        filter.limit = '1';
        filter.error = OrderErrorType.acknowledge;
        filter.since = OrdersFilter.aWeekBefore();

        return this.ordersService.fetchOrdersList(filter);
    }

    protected fetchShippingErrors(): Observable<PagedResponse<{ order: Order[] }>> {
        const filter = Object.assign(new OrdersFilter(), OrdersFilterPatch.OrdersWithShippingErrors);
        filter.limit = '1';
        filter.since = OrdersFilter.aWeekBefore();

        return this.ordersService.fetchOrdersList(filter);
    }
}
