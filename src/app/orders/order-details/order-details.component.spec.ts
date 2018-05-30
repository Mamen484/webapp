import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog, MatSnackBar, MatTableModule } from '@angular/material';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { OrderDetailsComponent } from './order-details.component';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { OrdersService } from '../../core/services/orders.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { CarrierDetailsDialogComponent } from '../carrier-details-dialog/carrier-details-dialog.component';
import { OrderStatusChangedSnackbarComponent } from '../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { OrderNotifyAction } from '../../core/entities/order-notify-action.enum';


describe('OrderDetailsComponent', () => {
    let component: OrderDetailsComponent;
    let fixture: ComponentFixture<OrderDetailsComponent>;
    let matDialog: jasmine.SpyObj<MatDialog>;
    let route;
    let snackbar: jasmine.SpyObj<MatSnackBar>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let appStore: jasmine.SpyObj<Store<AppState>>;

    beforeEach(async(() => {
        matDialog = jasmine.createSpyObj(['open']);
        route = {};
        snackbar = jasmine.createSpyObj(['openFromComponent']);
        ordersService = jasmine.createSpyObj(['ship', 'acknowledge', 'cancel']);
        appStore = jasmine.createSpyObj(['select']);

        TestBed.configureTestingModule({
            declarations: [OrderDetailsComponent, RemoveUnderlinePipe, SfCurrencyPipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialog, useValue: matDialog},
                {provide: ActivatedRoute, useValue: route},
                {provide: MatSnackBar, useValue: snackbar},
                {provide: OrdersService, useValue: ordersService},
                {provide: Store, useValue: appStore},
            ],
            imports: [MatTableModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderDetailsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
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
        component.shipOrder();
        expect(ordersService.ship.calls.mostRecent().args[0]).toEqual(289);
        expect(ordersService.ship.calls.mostRecent().args[1][0].reference).toEqual('ref');
        expect(ordersService.ship.calls.mostRecent().args[1][0].channelName).toEqual('nom');
        expect(ordersService.ship.calls.mostRecent().args[1][0].carrier).toEqual('ca');
        expect(ordersService.ship.calls.mostRecent().args[1][0].trackingNumber).toEqual('cb');
        expect(ordersService.ship.calls.mostRecent().args[1][0].trackingLink).toEqual('ce');
    });

    it('should open a success snackbar if status change is successful', () => {
        component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
        appStore.select.and.returnValue(of({id: 289}));
        ordersService.ship.and.returnValue(of({}));
        matDialog.open.and.returnValue({afterClosed: () => of({carrier: 'ca', trackingNumber: 'cb', trackingLink: 'ce'})});
        component.shipOrder();
        expect(snackbar.openFromComponent.calls.mostRecent().args[0]).toEqual(OrderStatusChangedSnackbarComponent);
        expect(snackbar.openFromComponent.calls.mostRecent().args[1].data.ordersNumber).toEqual(1);
        expect(snackbar.openFromComponent.calls.mostRecent().args[1].data.action).toEqual(OrderNotifyAction.ship);
    });

    it('should send an acknowledge request on acknowledgeOrder() call', () => {
        component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
        appStore.select.and.returnValue(of({id: 289}));
        ordersService.acknowledge.and.returnValue(EMPTY);
        component.acknowledgeOrder();
        expect(ordersService.acknowledge.calls.mostRecent().args[0]).toEqual(289);
        expect(ordersService.acknowledge.calls.mostRecent().args[1][0].reference).toEqual('ref');
        expect(ordersService.acknowledge.calls.mostRecent().args[1][0].channelName).toEqual('nom');
    });

    it('should send a cancel request on cancelOrder() call', () => {
        component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
        appStore.select.and.returnValue(of({id: 289}));
        ordersService.cancel.and.returnValue(EMPTY);
        component.cancelOrder();
        expect(ordersService.cancel.calls.mostRecent().args[0]).toEqual(289);
        expect(ordersService.cancel.calls.mostRecent().args[1][0].reference).toEqual('ref');
        expect(ordersService.cancel.calls.mostRecent().args[1][0].channelName).toEqual('nom');
    });
});


export class BlankPipe implements PipeTransform {
    transform(value: any): any {
        return value;
    }
}

@Pipe({name: 'removeUnderline'})
export class RemoveUnderlinePipe extends BlankPipe implements PipeTransform {
}

@Pipe({name: 'sfCurrency'})
export class SfCurrencyPipe extends BlankPipe implements PipeTransform {
}
