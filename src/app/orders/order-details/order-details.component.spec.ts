import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog, MatSnackBar, MatTableModule } from '@angular/material';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { OrderDetailsComponent } from './order-details.component';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of, Subject, throwError } from 'rxjs';
import { OrdersService } from '../../core/services/orders.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { CarrierDetailsDialogComponent } from '../carrier-details-dialog/carrier-details-dialog.component';
import { OrderStatusChangedSnackbarComponent } from '../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { FormsModule } from '@angular/forms';
import { Order } from '../../core/entities/orders/order';
import { ValidationErrorsSnackbarComponent } from '../../shared/validation-errors-snackbar/validation-errors-snackbar.component';
import { InvoicesLinkPipe } from '../../shared/invoices-link/invoices-link.pipe';


describe('OrderDetailsComponent', () => {
    let component: OrderDetailsComponent;
    let fixture: ComponentFixture<OrderDetailsComponent>;
    let matDialog: jasmine.SpyObj<MatDialog>;
    let route;
    let snackbar: jasmine.SpyObj<MatSnackBar>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let dataSubject$: Subject<{ order: Order }>;

    beforeEach(async(() => {
        matDialog = jasmine.createSpyObj(['open']);
        dataSubject$ = new Subject();
        route = {data: dataSubject$.asObservable()};
        snackbar = jasmine.createSpyObj(['openFromComponent', 'open']);
        ordersService = jasmine.createSpyObj(['ship', 'acknowledge', 'cancel', 'accept', 'refuse', 'unacknowledge', 'modifyOrder']);
        appStore = jasmine.createSpyObj(['select']);

        TestBed.configureTestingModule({
            declarations: [OrderDetailsComponent, RemoveUnderlinePipe, SfCurrencyPipe, InvoicesLinkPipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialog, useValue: matDialog},
                {provide: ActivatedRoute, useValue: route},
                {provide: MatSnackBar, useValue: snackbar},
                {provide: OrdersService, useValue: ordersService},
                {provide: Store, useValue: appStore},
            ],
            imports: [MatTableModule, FormsModule]
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
        component.applyStatusAction(OrderNotifyAction.ship);
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

    [
        OrderNotifyAction.acknowledge,
        OrderNotifyAction.unacknowledge,
        OrderNotifyAction.cancel,
        OrderNotifyAction.accept,
        OrderNotifyAction.refuse,
    ].forEach(action => {
        it(`should send an acknowledge request on call applyStatusAction with ${action} param`, () => {
            component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
            appStore.select.and.returnValue(of({id: 289}));
            ordersService[action].and.returnValue(EMPTY);
            component.applyStatusAction(action);
            expect(ordersService[action].calls.mostRecent().args[0]).toEqual(289);
            expect(ordersService[action].calls.mostRecent().args[1][0].reference).toEqual('ref');
            expect(ordersService[action].calls.mostRecent().args[1][0].channelName).toEqual('nom');
        });
    });

    it('should display a ship error', () => {
        component.order = <any>{
            errors: [{type: OrderErrorType.ship}],
            reference: '11-ref',
            payment: {},
            _embedded: {channel: {_links: {image: {}}}},
            billingAddress: {},
            shippingAddress: {},
        };
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(1);
        expect(warn[0].querySelector('span').textContent.trim()).toEqual('We were unable to ship your order 11-ref');
    });

    it('should display an acknowledge error', () => {
        component.order = <any>{
            errors: [{type: OrderErrorType.acknowledge}],
            reference: '11-ref',
            payment: {},
            _embedded: {channel: {_links: {image: {}}}},
            billingAddress: {},
            shippingAddress: {},
        };
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(1);
        expect(warn[0].querySelector('span').textContent.trim()).toEqual('We were unable to import your order 11-ref');
    });

    it('should NOT display errors when errors array is empty', () => {
        component.order = <any>{
            errors: [],
            reference: '11-ref',
            payment: {},
            _embedded: {channel: {_links: {image: {}}}},
            billingAddress: {},
            shippingAddress: {},
        };
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(0);
    });

    it('should call a modify order endpoint on save the order', () => {
        appStore.select.and.returnValue(of({id: 22}));
        ordersService.modifyOrder.and.returnValue(EMPTY);
        component.order = <any>{id: 141};
        component.save({});
        expect(ordersService.modifyOrder.calls.mostRecent().args[0]).toEqual(22);
        expect(ordersService.modifyOrder.calls.mostRecent().args[1]).toEqual(141);
    });

    it('should NOT call a modify order endpoint on save the order if validation fails', () => {
        appStore.select.and.returnValue(of({id: 22}));
        ordersService.modifyOrder.and.returnValue(EMPTY);
        component.order = <any>{id: 141};
        component.save(false);
        expect(ordersService.modifyOrder).not.toHaveBeenCalled();
    });

    it('should show a snackbar on save the order if validation fails', () => {
        appStore.select.and.returnValue(of({id: 22}));
        ordersService.modifyOrder.and.returnValue(EMPTY);
        component.order = <any>{id: 141};
        component.save(false);
        expect(snackbar.openFromComponent.calls.mostRecent().args[0]).toEqual(ValidationErrorsSnackbarComponent);
    });

    it('should show a success snackbar if the order was updated successfully', () => {
        appStore.select.and.returnValue(of({id: 22}));
        ordersService.modifyOrder.and.returnValue(of({}));
        component.order = <any>{id: 141};
        component.save({});
        expect(snackbar.openFromComponent.calls.mostRecent().args[0]).toEqual(OrderStatusChangedSnackbarComponent);
        expect(snackbar.openFromComponent.calls.mostRecent().args[1].data.action).toEqual('save');
    });

    it('should show an error snackbar if an error occures on saving the order', () => {
        appStore.select.and.returnValue(of({id: 22}));
        ordersService.modifyOrder.and.returnValue(throwError({message: 'some error occured'}));
        component.order = <any>{id: 141};
        component.save({});
        expect(snackbar.open.calls.mostRecent().args[0]).toEqual('some error occured');
        expect(snackbar.open.calls.mostRecent().args[2].panelClass).toEqual('sf-snackbar-error');
    });

    it('should replace a special absent api value into an empty string', () => {
        component.order = <any>{
            billingAddress: {}, shippingAddress: {}, payment: {},
            _embedded: {channel: {_links: {image: {}}}},
        };
        fixture.detectChanges();
        dataSubject$.next({
            order: <any>{
                errors: [{type: OrderErrorType.acknowledge}],
                reference: '11-ref',
                payment: {},
                _embedded: {channel: {_links: {image: {}}}},
                billingAddress: {},
                shippingAddress: {},
                items: [{name: '@_absent', image: '@_absent'}],
            }
        });
        expect(component.data.data[0].image).toEqual('');
        expect(component.data.data[0].name).toEqual('');
    });

});


export class BlankPipe implements PipeTransform {
    transform(value: any): any {
        return value;
    }
}

@Pipe({name: 'removeUnderline'})
class RemoveUnderlinePipe extends BlankPipe implements PipeTransform {
}

@Pipe({name: 'sfCurrency'})
class SfCurrencyPipe extends BlankPipe implements PipeTransform {
}
