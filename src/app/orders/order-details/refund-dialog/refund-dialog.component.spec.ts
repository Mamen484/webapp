import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RefundDialogComponent } from './refund-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Order } from '../../../core/entities/orders/order';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { OrdersService } from '../../../core/services/orders.service';
import { SelectItemsDialogComponent } from '../select-items-dialog/select-items-dialog.component';
import { EMPTY, of, throwError } from 'rxjs';
import { OrderStatusChangedSnackbarComponent } from '../../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { OrderNotifyAction } from '../../../core/entities/orders/order-notify-action.enum';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';

describe('RefundDialogComponent', () => {
    let component: RefundDialogComponent;
    let fixture: ComponentFixture<RefundDialogComponent>;
    let data: Order;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let snackBar: jasmine.SpyObj<MatSnackBar>;
    let matDialogRef: jasmine.SpyObj<MatDialogRef<RefundDialogComponent>>;

    beforeEach(async(() => {
        data = <any>{};
        ordersService = jasmine.createSpyObj(['notifyRefund']);
        snackBar = jasmine.createSpyObj(['openFromComponent', 'open']);
        matDialogRef = jasmine.createSpyObj(['close']);
        TestBed.configureTestingModule({
            declarations: [RefundDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: data},
                {provide: OrdersService, useValue: ordersService},
                {provide: MatSnackBar, useValue: snackBar},
                {provide: MatDialogRef, useValue: matDialogRef},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RefundDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should initialize an order property', () => {
        expect(component.order).toEqual(<any>{});
    });

    it('should show SelectItems dialog if no items nor shipping refund selected on refund() call', () => {
        component.itemsTable = <any>{selection: {selected: [], refundShipping: false}};
        component.refund();
        expect(snackBar.openFromComponent).toHaveBeenCalledWith(SelectItemsDialogComponent, {duration: 5000});
    });

    it('should NOT request an order refund if no items nor shipping refund selected on refund() call', () => {
        component.itemsTable = <any>{selection: {selected: [], refundShipping: false}};
        component.refund();
        expect(ordersService.notifyRefund).not.toHaveBeenCalled();
    });

    it('should request an order refund if at least one item is selected on refund() call', () => {
        component.itemsTable = <any>{selection: {selected: [{reference: '1234'}]}, refundShipping: false, selectedQuantity: {1234: 4}};
        component.order = <any>{reference: '4321', _embedded: {channel: {name: 'Laredoute'}}};
        ordersService.notifyRefund.and.returnValue(EMPTY);
        component.refund();
        expect(snackBar.openFromComponent).not.toHaveBeenCalled();
        expect(ordersService.notifyRefund).toHaveBeenCalledWith([{
            reference: '4321',
            channelName: 'Laredoute',
            refund: {
                shipping: false,
                products: [{reference: '1234', quantity: 4}]
            }
        }]);
    });

    it('should request an order refund if shipping refund is selected on refund() call', () => {
        component.itemsTable = <any>{selection: {selected: []}, refundShipping: true};
        component.order = <any>{reference: '4321', _embedded: {channel: {name: 'Laredoute'}}};
        ordersService.notifyRefund.and.returnValue(EMPTY);
        component.refund();
        expect(snackBar.openFromComponent).not.toHaveBeenCalled();
        expect(ordersService.notifyRefund).toHaveBeenCalledWith([{
            reference: '4321',
            channelName: 'Laredoute',
            refund: {shipping: true, products: []}
        }]);
    });

    it('should show a success message and close a dialog on successful refund', () => {
        component.itemsTable = <any>{selection: {selected: []}, refundShipping: true};
        component.order = <any>{reference: '4321', _embedded: {channel: {name: 'Laredoute'}}};
        ordersService.notifyRefund.and.returnValue(of({}));
        component.refund();
        expect(snackBar.openFromComponent).toHaveBeenCalledWith(OrderStatusChangedSnackbarComponent, {
            duration: 2000,
            data: {ordersNumber: 1, action: OrderNotifyAction.refund},
        });
        expect(matDialogRef.close).toHaveBeenCalled();
    });

    it('should show an error message if refund failed', () => {
        component.itemsTable = <any>{selection: {selected: []}, refundShipping: true};
        component.order = <any>{reference: '4321', _embedded: {channel: {name: 'Laredoute'}}};
        ordersService.notifyRefund.and.returnValue(throwError({message: 'some error'}));
        component.refund();
        expect(snackBar.open).toHaveBeenCalledWith('some error', '', new ErrorSnackbarConfig())
    });
});
