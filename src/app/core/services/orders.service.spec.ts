import { TestBed, inject } from '@angular/core/testing';

import { OrdersService } from './orders.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrdersFilter } from '../entities/orders-filter';
import { OrderStatus } from '../entities/orders/order-status.enum';
import { environment } from '../../../environments/environment';
import { OrderErrorType } from '../entities/orders/order-error-type.enum';
import { OrderAcknowledgement } from '../entities/orders/order-acknowledgement.enum';

describe('OrdersService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [OrdersService],
            imports: [HttpClientTestingModule]
        });
    });

    it('should be created', inject([OrdersService], (service: OrdersService) => {
        expect(service).toBeTruthy();
    }));

    it('should call appropriate endpoint when filter.status is specified',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            let filter = new OrdersFilter();
            filter.status = OrderStatus.shipped;
            service.fetchOrdersList(11, filter).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&status=shipped&page=1`);
            httpMock.verify();
        }));

    it('should call appropriate endpoint when filter.errorType is specified',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            let filter = new OrdersFilter();
            filter.error = OrderErrorType.ship;
            service.fetchOrdersList(11, filter).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&error=ship&page=1`);
            httpMock.verify();
        }));

    it('should call appropriate endpoint when filter.since is specified',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            let filter = new OrdersFilter();
            filter.since = new Date('2025-02-25');
            service.fetchOrdersList(11, filter).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&since=2025-02-25T00:00:00.000Z&page=1`);
            httpMock.verify();
        }));

    it('should call appropriate endpoint when filter.until is specified',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            let filter = new OrdersFilter();
            filter.until = new Date('2025-02-25');
            service.fetchOrdersList(11, filter).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&until=2025-02-25T00:00:00.000Z&page=1`);
            httpMock.verify();
        }));

    it('should NOT include channel to endpoint params if channel value is `all`',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            let filter = new OrdersFilter();
            filter.channel = 'all';
            service.fetchOrdersList(11, filter).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&page=1`);
            httpMock.verify();
        }));

    it('should call appropriate endpoint when filter.channel is specified',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            let filter = new OrdersFilter();
            filter.channel = 'some-channel';
            service.fetchOrdersList(11, filter).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&channel=some-channel&page=1`);
            httpMock.verify();
        }));

    it('should NOT include search to endpoint params if search value is empty',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            let filter = new OrdersFilter();
            filter.search = '';
            service.fetchOrdersList(11, filter).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&page=1`);
            httpMock.verify();
        }));

    it('should call appropriate endpoint when filter.search is specified',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            let filter = new OrdersFilter();
            filter.search = 'tadada';
            service.fetchOrdersList(11, filter).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&search=tadada&page=1`);
            httpMock.verify();
        }));

    it('should NOT include tag to endpoint params if tag value is `all`',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            let filter = new OrdersFilter();
            filter.tag = 'all';
            service.fetchOrdersList(11, filter).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&page=1`);
            httpMock.verify();
        }));

    it('should call appropriate endpoint when filter.tag is specified',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            let filter = new OrdersFilter();
            filter.tag = 'tadada';
            service.fetchOrdersList(11, filter).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&tag=tadada&page=1`);
            httpMock.verify();
        }));

    it('should NOT include status param to endpoint params if it has undefined value', inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
        let filter = new OrdersFilter();
        filter.status = undefined;
        filter.error = OrderErrorType.ship;
        service.fetchOrdersList(11, filter).subscribe();
        httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&error=ship&page=1`);
        httpMock.verify();
    }));

    it('should NOT include acknowledgement param to endpoint params if it has undefined value', inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
        let filter = new OrdersFilter();
        filter.acknowledgement = undefined;
        filter.error = OrderErrorType.ship;
        service.fetchOrdersList(11, filter).subscribe();
        httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&error=ship&page=1`);
        httpMock.verify();
    }));

    it('should NOT include errorType param to endpoint params if it has undefined value', inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
        let filter = new OrdersFilter();
        filter.status = OrderStatus.shipped;
        filter.error = undefined;
        service.fetchOrdersList(11, filter).subscribe();
        httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&status=shipped&page=1`);
        httpMock.verify();
    }));

    it('should include all params if they are specified',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            let filter = new OrdersFilter();
            filter.tag = 'tadada';
            filter.error = OrderErrorType.acknowledge;
            filter.search = 'pamparam';
            filter.status = OrderStatus.waiting_store_acceptance;
            filter.since = new Date('2010-01-01');
            filter.until = new Date('2030-01-01');
            filter.channel = 'channel132';
            filter.acknowledgement = OrderAcknowledgement.unacknowledged;
            service.fetchOrdersList(11, filter).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&since=2010-01-01T00:00:00.000Z&until=2030-01-01T00:00:00.000Z&channel=channel132&search=pamparam&tag=tadada&status=waiting_store_acceptance&error=acknowledge&acknowledgement=unacknowledged&page=1`);
            httpMock.verify();
        }));

    it('should fetch an order on fetchOrder() call',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            service.fetchOrder(11, 14).subscribe();
            httpMock.expectOne(`${environment.API_URL}/store/11/order/14`);
            httpMock.verify();
        }));

    it('should acknowledge orders',
        inject([OrdersService, HttpTestingController], (service: OrdersService, httpMock: HttpTestingController) => {
            service.acknowledge(10, [{reference: '171'}, {reference: '174'}]).subscribe();
            let req = httpMock.expectOne(`${environment.API_URL}/store/10/order/acknowledge`);
            expect(req.request.body.order[0].reference).toEqual('171');
            expect(req.request.body.order[1].reference).toEqual('174');
            httpMock.verify();
        }));
});
