import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesComponent } from './addresses.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';
import { MatSnackBar } from '@angular/material';
import { of, throwError } from 'rxjs';
import { AddressSavedSnackbarComponent, AddressType } from '../address-saved-snackbar/address-saved-snackbar.component';

describe('AddressesComponent', () => {
    let component: AddressesComponent;
    let fixture: ComponentFixture<AddressesComponent>;

    let appStore: jasmine.SpyObj<Store<AppState>>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let snackBar: jasmine.SpyObj<MatSnackBar>;

    beforeEach(async(() => {

        appStore = jasmine.createSpyObj(['select']);
        ordersService = jasmine.createSpyObj(['modifyBillingAddress', 'modifyShippingAddress']);
        snackBar = jasmine.createSpyObj(['open', 'openFromComponent']);

        TestBed.configureTestingModule({
            declarations: [AddressesComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: OrdersService, useValue: ordersService},
                {provide: MatSnackBar, useValue: snackBar},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddressesComponent);
        component = fixture.componentInstance;
        component.order = <any>{shippingAddress: {}, billingAddress: {}, id: 22};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create an order copy on init not to cause side effects', () => {
        expect(component.order).not.toBe(component.orderCopy);
        expect(component.order).toEqual(component.orderCopy);
    });

    it('should copy a billing address from order to orderCopy on resetBillingAddress() call', () => {
        component.orderCopy.billingAddress = <any>{someField: 'some value'};
        component.resetBillingAddress();
        expect((<any>component.orderCopy.billingAddress).someField).not.toBeDefined();
        expect(component.orderCopy.billingAddress).toEqual(component.order.billingAddress);
    });

    it('should copy a billing address from order to orderCopy on resetShippingAddress() call', () => {
        component.orderCopy.shippingAddress = <any>{someField: 'some value'};
        component.resetShippingAddress();
        expect((<any>component.orderCopy.shippingAddress).someField).not.toBeDefined();
        expect(component.orderCopy.shippingAddress).toEqual(component.order.shippingAddress);
    });

    it('should call a modify billing address service on saveBillingAddress() call', () => {
        appStore.select.and.returnValue(of({id: 90}));
        component.saveBillingAddress();
        expect(ordersService.modifyBillingAddress).toHaveBeenCalledTimes(1);
        expect(ordersService.modifyBillingAddress)
            .toHaveBeenCalledWith(90, 22, component.orderCopy.billingAddress);
    });

    it('should set new billing address into order property after successful save', () => {
        appStore.select.and.returnValue(of({id: 90}));
        component.orderCopy.billingAddress.firstName = 'some firstname';
        ordersService.modifyBillingAddress.and.returnValue(of({}));
        component.saveBillingAddress();
        expect(component.order.billingAddress.firstName).toBe('some firstname');
    });

    it('should show a snackbar after successful billing address save', () => {
        appStore.select.and.returnValue(of({id: 90}));
        component.orderCopy.billingAddress.firstName = 'some firstname';
        ordersService.modifyBillingAddress.and.returnValue(of({}));
        component.saveBillingAddress();
        expect(snackBar.openFromComponent).toHaveBeenCalledWith(AddressSavedSnackbarComponent, {
            data: {type: AddressType.billingAddress},
            duration: 2000,
        });
    });

    it('should show a snackbar after billing address save failed', () => {
        appStore.select.and.returnValue(of({id: 90}));
        component.orderCopy.billingAddress.firstName = 'some firstname';
        ordersService.modifyBillingAddress.and.returnValue(throwError({message: 'error message'}));
        component.saveBillingAddress();
        expect(snackBar.open).toHaveBeenCalledWith('error message', '', {
            panelClass: 'sf-snackbar-error',
            duration: 5000,
        });
    });

    it('should call a modify shipping address service on saveShippingAddress() call', () => {
        appStore.select.and.returnValue(of({id: 90}));
        component.saveShippingAddress();
        expect(ordersService.modifyShippingAddress).toHaveBeenCalledTimes(1);
        expect(ordersService.modifyShippingAddress)
            .toHaveBeenCalledWith(90, 22, component.orderCopy.shippingAddress);
    });

    it('should set new shipping address into order property after successful save', () => {
        appStore.select.and.returnValue(of({id: 90}));
        component.orderCopy.shippingAddress.firstName = 'some firstname';
        ordersService.modifyShippingAddress.and.returnValue(of({}));
        component.saveShippingAddress();
        expect(component.order.shippingAddress.firstName).toBe('some firstname');
    });

    it('should show a snackbar after shipping address successful save', () => {
        appStore.select.and.returnValue(of({id: 90}));
        component.orderCopy.shippingAddress.firstName = 'some firstname';
        ordersService.modifyShippingAddress.and.returnValue(of({}));
        component.saveShippingAddress();
        expect(snackBar.openFromComponent).toHaveBeenCalledWith(AddressSavedSnackbarComponent, {
            data: {type: AddressType.shippingAddress},
            duration: 2000,
        });
    });

    it('should show a snackbar after shipping address save failed', () => {
        appStore.select.and.returnValue(of({id: 90}));
        component.orderCopy.shippingAddress.firstName = 'some firstname';
        ordersService.modifyShippingAddress.and.returnValue(throwError({message: 'error message'}));
        component.saveShippingAddress();
        expect(snackBar.open).toHaveBeenCalledWith('error message', '', {
            panelClass: 'sf-snackbar-error',
            duration: 5000,
        });
    });
});
