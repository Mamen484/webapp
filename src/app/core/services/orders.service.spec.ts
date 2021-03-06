import { TestBed } from '@angular/core/testing';

import { OrdersService } from './orders.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrdersFilter } from '../entities/orders/orders-filter';
import { OrderStatus } from '../entities/orders/order-status.enum';
import { environment } from '../../../environments/environment';
import { OrderErrorType } from '../entities/orders/order-error-type.enum';
import { OrderAcknowledgment } from '../entities/orders/order-acknowledgment.enum';
import { OrderNotifyAction } from '../entities/orders/order-notify-action.enum';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { of } from 'rxjs';
import { TestOrder } from '../entities/orders/test-order';

describe('OrdersService', () => {

    let service: OrdersService;
    let httpMock: HttpTestingController;
    let appStore: jasmine.SpyObj<Store<AppState>>;

    beforeEach(() => {

        appStore = jasmine.createSpyObj(['select']);
        TestBed.configureTestingModule({
            providers: [
                OrdersService,
                {provide: Store, useValue: appStore},
            ],
            imports: [HttpClientTestingModule],
        });
    });

    beforeEach(() => {
        service = TestBed.get(OrdersService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call appropriate endpoint on fetchExport()', async () => {
        service.fetchExports(23).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/store/23/order/export?limit=200`);
        expect(req.request.method).toEqual('GET');
    });

    it('should cache exports and call server only once on multiple fetchExport() calls', async () => {
        service.fetchExports(23).subscribe();
        service.fetchExports(23).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/store/23/order/export?limit=200`);
        expect(req.request.method).toEqual('GET');
    });

    describe('fetchOrdersList', () => {

        let filter;
        let req;

        beforeEach(() => {
            req = {};
            filter = new OrdersFilter();
            filter.since = undefined;
            appStore.select.and.returnValue(of({id: 11}));
        });
        afterEach(() => {
            expect(req.request.method).toEqual('GET');
            httpMock.verify();
        });


        it('should call appropriate endpoint when filter.status is specified', async () => {
            filter.status = OrderStatus.shipped;
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&status=shipped&page=1`);

        });

        it('should call appropriate endpoint when filter.errorType is specified', () => {
            filter.error = OrderErrorType.ship;
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&error=ship&page=1`);
        });

        it('should call appropriate endpoint when filter.since is specified', () => {
            filter.since = new Date('2025-02-25');
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&since=2025-02-25T00:00:00.000Z&page=1`);
        });

        it('should call appropriate endpoint when filter.until is specified', () => {
            filter.until = new Date('2025-02-25');
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&until=2025-02-25T00:00:00.000Z&page=1`);
        });

        it('should NOT include channel to endpoint params if channel value is `all`', () => {
            filter.channel = 'all';
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&page=1`);
        });

        it('should call appropriate endpoint when filter.channel is specified', () => {
            filter.channel = 'some-channel';
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&channelId=some-channel&page=1`);
        });

        it('should NOT include search to endpoint params if search value is empty', () => {
            filter.search = '';
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&page=1`);
        });

        it('should call appropriate endpoint when filter.search is specified', () => {
            filter.search = 'tadada';
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&search=tadada&page=1`);
        });

        it('should NOT include tag to endpoint params if tag value is `all`', () => {
            filter.tag = 'all';
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&page=1`);
        });

        it('should call appropriate endpoint when filter.tag is specified', () => {
            filter.tag = 'tadada';
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&tagName=tadada&page=1`);
        });

        it('should NOT include status param to endpoint params if it has undefined value', () => {
            filter.status = undefined;
            filter.error = OrderErrorType.ship;
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&error=ship&page=1`);
        });

        it('should NOT include acknowledgment param to endpoint params if it has undefined value', () => {
            filter.acknowledgment = undefined;
            filter.error = OrderErrorType.ship;
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&error=ship&page=1`);
        });

        it('should NOT include errorType param to endpoint params if it has undefined value', () => {
            filter.status = OrderStatus.shipped;
            filter.error = undefined;
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&status=shipped&page=1`);
        });

        it('should include all params if they are specified', () => {
            filter.tag = 'tadada';
            filter.error = OrderErrorType.acknowledge;
            filter.search = 'pamparam';
            filter.status = OrderStatus.waiting_store_acceptance;
            filter.since = new Date('2010-01-01');
            filter.until = new Date('2030-01-01');
            filter.channel = 'channel132';
            filter.acknowledgment = OrderAcknowledgment.unacknowledged;
            service.fetchOrdersList(filter).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order?limit=10&since=2010-01-01T00:00:00.000Z`
                + `&until=2030-01-01T00:00:00.000Z&channelId=channel132&search=pamparam&tagName=tadada&status=waiting_store_acceptance`
                + `&error=acknowledge&acknowledgment=unacknowledged&page=1`);
        });

        it('should fetch an order on fetchOrder() call', () => {
            service.fetchOrder(11, 14).subscribe();
            req = httpMock.expectOne(`${environment.API_URL}/store/11/order/14`);
        });
    });

    it('should acknowledge orders', () => {
        checkStatusChangeRequestSent(OrderNotifyAction.acknowledge);
    });

    it('should unacknowledge orders', () => {
        checkStatusChangeRequestSent(OrderNotifyAction.unacknowledge);
    });

    it('should accept orders', () => {
        checkStatusChangeRequestSent(OrderNotifyAction.ship);
    });

    it('should ship orders', () => {
        checkStatusChangeRequestSent(OrderNotifyAction.accept);
    });

    it('should refuse orders', () => {
        checkStatusChangeRequestSent(OrderNotifyAction.refuse);
    });

    it('should cancel orders', () => {
        checkStatusChangeRequestSent(OrderNotifyAction.cancel);
    });

    it('should refund orders', () => {
        appStore.select.and.returnValue(of({id: 10}));
        service.notifyRefund([{
            reference: '171',
            channelName: '',
            refund: {shipping: false, products: [{reference: '123', quantity: 1}]}
        }]).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/store/10/order/refund`);
        expect(req.request.body).toEqual({
            order: [{
                reference: '171',
                channelName: '',
                refund: {shipping: false, products: [{reference: '123', quantity: 1}]}
            }]
        });
        httpMock.verify();
    });

    it('should call modify billing address endpoint on modifyBillingAddress() call', () => {
        service.modifyBillingAddress(1, 2, <any>{lastName: '22'}).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/store/1/order/2`);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual({order: {billingAddress: {lastName: '22'}}})
    });

    it('should call modify shipping address endpoint on modifyShippingAddress() call', () => {
        service.modifyShippingAddress(1, 2, <any>{lastName: '22'}).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/store/1/order/2`);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual({order: {shippingAddress: {lastName: '22'}}})
    });

    it('should call modify sku endpoint on updateSkuMapping() call', () => {
        service.updateItemsReferences(1, 2, <any>{'old': 'new'}).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/store/1/order/2`);
        expect(req.request.method).toBe('PATCH');
        expect(req.request.body).toEqual({order: {itemsReferencesAliases: {old: 'new'}}});
    });

    it('should send a proper request to create a test order', () => {
        appStore.select.and.returnValue(of({id: 10}));
        const order = new TestOrder();
        service.create(order).subscribe();
        const req = httpMock.expectOne(`${environment.API_URL}/store/10/order`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({order});
    });


    function checkStatusChangeRequestSent(action) {
        service[action](10, [{reference: '171', channelName: ''}, {reference: '174', channelName: ''}]).subscribe();
        let req = httpMock.expectOne(`${environment.API_URL}/store/10/order/${action}`);
        expect(req.request.body.order[0].reference).toEqual('171');
        expect(req.request.body.order[1].reference).toEqual('174');
        httpMock.verify();
    }
});
