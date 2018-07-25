import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsTableComponent } from './items-table.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { MatDialog, MatSnackBar, MatTableModule } from '@angular/material';
import { OrdersService } from '../../../core/services/orders.service';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarrierDetailsDialogComponent } from '../../carrier-details-dialog/carrier-details-dialog.component';
import { OrderNotifyAction } from '../../../core/entities/orders/order-notify-action.enum';
import { EMPTY, of } from 'rxjs/index';
import { OrderStatusChangedSnackbarComponent } from '../../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { OrderAcknowledgment } from '../../../core/entities/orders/order-acknowledgment.enum';

describe('ItemsTableComponent', () => {
    let component: ItemsTableComponent;
    let fixture: ComponentFixture<ItemsTableComponent>;

    let matDialog: jasmine.SpyObj<MatDialog>;
    let snackbar: jasmine.SpyObj<MatSnackBar>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let appStore: jasmine.SpyObj<Store<AppState>>;

    beforeEach(async(() => {

        matDialog = jasmine.createSpyObj(['open']);
        snackbar = jasmine.createSpyObj(['openFromComponent', 'open']);
        ordersService = jasmine.createSpyObj(['ship', 'acknowledge', 'cancel', 'accept', 'refuse', 'unacknowledge', 'modifyOrder']);
        appStore = jasmine.createSpyObj(['select']);
        TestBed.configureTestingModule({
            declarations: [ItemsTableComponent, SfCurrencyPipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialog, useValue: matDialog},
                {provide: MatSnackBar, useValue: snackbar},
                {provide: OrdersService, useValue: ordersService},
                {provide: Store, useValue: appStore},
            ],
            imports: [MatTableModule, FormsModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsTableComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize acknowledgment property on component init as acknowledged if order acknowledgedAt is defined', () => {
        component.order = <any>{
            createdAt: new Date('2012-12-12').getTime(),
            acknowledgedAt: new Date('2012-12-14').getTime(),
            items: [],
            payment: {},
        };
        fixture.detectChanges();
        expect(component.acknowledgment).toEqual(OrderAcknowledgment.acknowledged);
    });

    it('should initialize acknowledgment property on component init as UNacknowledged if order acknowledgedAt is NOT defined', () => {
        component.order = <any>{
            createdAt: new Date('2012-12-12').getTime(),
            items: [],
            payment: {},
        };
        fixture.detectChanges();
        expect(component.acknowledgment).toEqual(OrderAcknowledgment.unacknowledged);
    });

    it('should initialize a datatable on component init', () => {
        component.order = <any>{
            createdAt: new Date('2012-12-12').getTime(),
            items: [{reference: 1324}],
            payment: {},
        };
        fixture.detectChanges();
        expect(component.tableData.data[0].sku).toEqual(1324);
    });

    it('should open a carrier details dialog when click on `ship` button', () => {
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.shipOrder();
        expect(matDialog.open).toHaveBeenCalledWith(CarrierDetailsDialogComponent);
    });

    it('should send a ship request after carrier details confirmed', () => {
        component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
        appStore.select.and.returnValue(of({id: 289}));
        ordersService.ship.and.returnValue(EMPTY);
        matDialog.open.and.returnValue({
            afterClosed: () => of({
                carrier: 'ca',
                trackingNumber: 'cb',
                trackingLink: 'ce',
            })
        });
        component.applyStatusAction(OrderNotifyAction.ship);
        expect(ordersService.ship.calls.mostRecent().args[0]).toEqual(289);
        expect(ordersService.ship.calls.mostRecent().args[1][0].reference).toEqual('ref');
        expect(ordersService.ship.calls.mostRecent().args[1][0].channelName).toEqual('nom');
        expect(ordersService.ship.calls.mostRecent().args[1][0].carrier).toEqual('ca');
        expect(ordersService.ship.calls.mostRecent().args[1][0].trackingNumber).toEqual('cb');
        expect(ordersService.ship.calls.mostRecent().args[1][0].trackingLink).toEqual('ce');
    });

    it('should open a success snackbar if an order shipped successfully', () => {
        component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
        appStore.select.and.returnValue(of({id: 289}));
        ordersService.ship.and.returnValue(of({}));
        matDialog.open.and.returnValue({afterClosed: () => of({carrier: 'ca', trackingNumber: 'cb', trackingLink: 'ce'})});
        component.shipOrder();
        expect(snackbar.openFromComponent.calls.mostRecent().args[0]).toEqual(OrderStatusChangedSnackbarComponent);
        expect(snackbar.openFromComponent.calls.mostRecent().args[1].data.ordersNumber).toEqual(1);
        expect(snackbar.openFromComponent.calls.mostRecent().args[1].data.action).toEqual(OrderNotifyAction.ship);
    });

    it('should open a success snackbar if an order acknowledged successfully', () => {
        component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
        appStore.select.and.returnValue(of({id: 289}));
        ordersService.acknowledge.and.returnValue(of({}));
        component.applyStatusAction(OrderNotifyAction.acknowledge);
        expect(snackbar.openFromComponent.calls.mostRecent().args[0]).toEqual(OrderStatusChangedSnackbarComponent);
        expect(snackbar.openFromComponent.calls.mostRecent().args[1].data.ordersNumber).toEqual(1);
        expect(snackbar.openFromComponent.calls.mostRecent().args[1].data.action).toEqual(OrderNotifyAction.acknowledge);
    });

    [
        OrderNotifyAction.acknowledge,
        OrderNotifyAction.unacknowledge,
        OrderNotifyAction.cancel,
        OrderNotifyAction.accept,
        OrderNotifyAction.refuse,
    ].forEach(action => {
        it(`should send an ${action} request on call applyStatusAction with ${action} param`, () => {
            component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
            appStore.select.and.returnValue(of({id: 289}));
            ordersService[action].and.returnValue(EMPTY);
            component.applyStatusAction(action);
            expect(ordersService[action].calls.mostRecent().args[0]).toEqual(289);
            expect(ordersService[action].calls.mostRecent().args[1][0].reference).toEqual('ref');
            expect(ordersService[action].calls.mostRecent().args[1][0].channelName).toEqual('nom');
        });
    });
});

export class BlankPipe implements PipeTransform {
    transform(value: any): any {
        return value;
    }
}

@Pipe({name: 'sfCurrency'})
class SfCurrencyPipe extends BlankPipe implements PipeTransform {
}
