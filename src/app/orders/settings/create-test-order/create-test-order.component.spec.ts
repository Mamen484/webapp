import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestOrderComponent } from './create-test-order.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';
import { MatAutocompleteModule, MatSnackBar } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EMPTY, of } from 'rxjs';
import { Router } from '@angular/router';
import { TestOrder } from '../../../core/entities/orders/test-order';
import { ValidationErrorsSnackbarComponent } from '../../../shared/validation-errors-snackbar/validation-errors-snackbar.component';
import { StoreService } from '../../../core/services/store.service';
import { Subject } from 'rxjs/Rx';

describe('CreateTestOrderComponent', () => {
    let component: CreateTestOrderComponent;
    let fixture: ComponentFixture<CreateTestOrderComponent>;

    let appStore: jasmine.SpyObj<Store<AppState>>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let snackBar: jasmine.SpyObj<MatSnackBar>;
    let router: jasmine.SpyObj<Router>;
    let storeService: jasmine.SpyObj<StoreService>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj(['select']);
        ordersService = jasmine.createSpyObj(['create']);
        snackBar = jasmine.createSpyObj(['open', 'openFromComponent']);
        router = jasmine.createSpyObj(['navigate']);
        storeService = jasmine.createSpyObj(['getStoreChannels']);

        TestBed.configureTestingModule({
            declarations: [CreateTestOrderComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: OrdersService, useValue: ordersService},
                {provide: MatSnackBar, useValue: snackBar},
                {provide: Router, useValue: router},
                {provide: StoreService, useValue: storeService},
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
            ],
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
        component.order = <any>{payment: {shippingAmount: '0'}, shipment: {}, items: [{price: '22'}]};
        appStore.select.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.totalPrice).toEqual(22);
    });

    it('should calculate a valid total price if shippingAmount is specified', () => {
        component.order = <any>{payment: {shippingAmount: '31'}, shipment: {}, items: [{price: '0'}]};
        appStore.select.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.totalPrice).toEqual(31);
    });

    it('should calculate a valid total price if shippingAmount is undefined', () => {
        component.order = <any>{payment: {shippingAmount: undefined}, shipment: {}, items: [{price: '24'}]};
        appStore.select.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.totalPrice).toEqual(24);
    });

    it('should calculate a valid total price if item price is undefined', () => {
        component.order = <any>{payment: {shippingAmount: '51'}, shipment: {}, items: [{price: undefined}]};
        appStore.select.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.totalPrice).toEqual(51);
    });

    it('should calculate a valid total price if both shippingAmount and item price are undefined', () => {
        component.order = <any>{payment: {shippingAmount: undefined}, shipment: {}, items: [{price: undefined}]};
        appStore.select.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.totalPrice).toEqual(0);
    });

    it('should create one order item on init', () => {
        component.order = new TestOrder();
        appStore.select.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.order.items.length).toEqual(1);
    });

    it('should add one order item on addItem() call', () => {
        component.order = new TestOrder();
        appStore.select.and.returnValue(EMPTY);
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
        appStore.select.and.returnValue(EMPTY);
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

    it('should return a channel name or undefined on channelDisplayFn() call', () => {
        expect(component.channelDisplayFn()).toBe(undefined);
        expect(component.channelDisplayFn(<any>{name: 'some name'})).toBe('some name');
    });

    it('should write a channel on selectChannel() call', () => {
        component.selectChannel({option: {value: {id: 22, name: 'some channel'}}});
        expect(component.order.channelId).toBe(22);
    });

    it('should assign a paymentMode into `predefined` if `amazon` channel selected', () => {
        component.selectChannel({option: {value: {id: component.channelMap.amazon, name: 'Amazon'}}});
        expect(component.paymentInputMode).toBe('predefined');
    });

    it('should assign a paymentMode into `predefined` if `cdiscount` channel selected', () => {
        component.selectChannel({option: {value: {id: component.channelMap.cdiscount, name: 'CDiscount'}}});
        expect(component.paymentInputMode).toBe('predefined');
    });

    it('should assign a paymentMode into `predefined` if `monechelle` channel selected', () => {
        component.selectChannel({option: {value: {id: component.channelMap.monechelle, name: 'Monechelle'}}});
        expect(component.paymentInputMode).toBe('predefined');
    });

    it('should assign a paymentMode into `custom` if any other channel selected', () => {
        component.selectChannel({option: {value: {id: 777, name: 'any channel'}}});
        expect(component.paymentInputMode).toBe('custom');
    });

    it('should add an empty order item on init', () => {
        appStore.select.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.order.items.length).toEqual(1);
    });

    it('should filter autocomplete options', () => {
        appStore.select.and.returnValues(
            of([{name: 'Amazon'}, {name: 'eBay'}, {name: 'Zamno'}]),
            of([{id: 22}]),
            EMPTY,
        );
        storeService.getStoreChannels.and.returnValue(of(
            {
                _embedded: {
                    channel: [
                        {_embedded: {channel: {name: 'CDiscount'}}, installed: false},
                        {_embedded: {channel: {name: 'Monamona'}}, installed: true},
                        {_embedded: {channel: {name: 'Tunamo'}}, installed: false},
                    ]
                }
            }
        ));
        component.channelControl = <any>{valueChanges: new Subject()};
        component.ngOnInit();
        (<Subject<string>>component.channelControl.valueChanges).next('am');
        expect(component.filteredChannels).toEqual(<any>[{name: 'Amazon'}, {name: 'Zamno'}]);
        expect(component.filteredNewChannels).toEqual(<any>[{name: 'Tunamo'}]);
    });
});
