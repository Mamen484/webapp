import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestOrderComponent } from './create-test-order.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';
import { MatSnackBar } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { TestOrder } from '../../../core/entities/orders/test-order';
import { ValidationErrorsSnackbarComponent } from '../../../shared/validation-errors-snackbar/validation-errors-snackbar.component';

describe('CreateTestOrderComponent', () => {
    let component: CreateTestOrderComponent;
    let fixture: ComponentFixture<CreateTestOrderComponent>;

    let appStore: jasmine.SpyObj<Store<AppState>>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let snackBar: jasmine.SpyObj<MatSnackBar>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj(['pipe']);
        ordersService = jasmine.createSpyObj(['create']);
        snackBar = jasmine.createSpyObj(['open', 'openFromComponent']);
        router = jasmine.createSpyObj(['navigate']);

        TestBed.configureTestingModule({
            declarations: [CreateTestOrderComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: OrdersService, useValue: ordersService},
                {provide: MatSnackBar, useValue: snackBar},
                {provide: Router, useValue: router},
            ],
            imports: [FormsModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateTestOrderComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate a valid total price if price is specified', () => {
        component.order = <any>{shipment: {shippingAmount: '0'}, items: [{price: '22'}]};
        appStore.pipe.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.totalPrice).toEqual(22);
    });

    it('should calculate a valid total price if shippingAmount is specified', () => {
        component.order = <any>{shipment: {shippingAmount: '31'}, items: [{price: '0'}]};
        appStore.pipe.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.totalPrice).toEqual(31);
    });

    it('should calculate a valid total price if shippingAmount is undefined', () => {
        component.order = <any>{shipment: {shippingAmount: undefined}, items: [{price: '24'}]};
        appStore.pipe.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.totalPrice).toEqual(24);
    });

    it('should calculate a valid total price if item price is undefined', () => {
        component.order = <any>{shipment: {shippingAmount: '51'}, items: [{price: undefined}]};
        appStore.pipe.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.totalPrice).toEqual(51);
    });

    it('should calculate a valid total price if both shippingAmount and item price are undefined', () => {
        component.order = <any>{shipment: {shippingAmount: undefined}, items: [{price: undefined}]};
        appStore.pipe.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.totalPrice).toEqual(0);
    });

    it('should create one order item on init', () => {
        component.order = new TestOrder();
        appStore.pipe.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.order.items.length).toEqual(1);
    });

    it('should initialize channels on init', () => {
        component.order = new TestOrder();
        appStore.pipe.and.returnValue(of([{something: 1}]));
        fixture.detectChanges();
        expect(component.channels.length).toEqual(1);
    });

    it('should add one order item on addItem() call', () => {
        component.order = new TestOrder();
        appStore.pipe.and.returnValue(EMPTY);
        expect(component.order.items.length).toEqual(0);
        component.addItem();
        expect(component.order.items.length).toEqual(1);
    });

    it('should remove specified order item on removeItem() call', () => {
        component.order = new TestOrder();
        component.order.items = [
            {reference: '1', price: 1},
            {reference: '2', price: 2},
            {reference: '3', price: 3},
            {reference: '4', price: 4},
        ];
        appStore.pipe.and.returnValue(EMPTY);
        component.removeItem(2);
        expect(component.order.items).toEqual([
            {reference: '1', price: 1},
            {reference: '2', price: 2},
            {reference: '4', price: 4},
        ]);
    });

    it('should show a warning if there are validation errors on save', () => {
        component.form = <any>{valid: false, controls: {}};
        component.create();
        expect(snackBar.openFromComponent.calls.mostRecent().args[0]).toEqual(ValidationErrorsSnackbarComponent);
    });

    it('should run markAsDirty() on each control if validation failed to show validation messages near fields', () => {
        const markAsDirtySpy = jasmine.createSpy();
        component.form = <any>{valid: false, controls: {someControl: {markAsDirty: markAsDirtySpy}}};
        component.create();
        expect(markAsDirtySpy).toHaveBeenCalled();
    });

    it('should make a POST request to create an order if validation passes', () => {
        component.form = <any>{valid: true};
        ordersService.create.and.returnValue(EMPTY);
        component.create();
        expect(ordersService.create).toHaveBeenCalled();
    });

    it('should navigate to the orders list if order creation is successful', () => {
        component.form = <any>{valid: true};
        ordersService.create.and.returnValue(of({}));
        component.create();
        expect(router.navigate).toHaveBeenCalledWith(['/orders']);
    });
});
