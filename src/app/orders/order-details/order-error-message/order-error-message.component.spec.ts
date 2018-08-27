import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderErrorMessageComponent } from './order-error-message.component';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderErrorType } from '../../../core/entities/orders/order-error-type.enum';

describe('OrderErrorMessageComponent', () => {
    let component: OrderErrorMessageComponent;
    let fixture: ComponentFixture<OrderErrorMessageComponent>;
    let route: ActivatedRoute;

    let queryParams$;

    beforeEach(async(() => {
        queryParams$ = new Subject();
        route = <any>{queryParams: queryParams$};
        TestBed.configureTestingModule({
            declarations: [OrderErrorMessageComponent],
            providers: [
                {provide: ActivatedRoute, useValue: route},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderErrorMessageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display a ship error', () => {
        component.order = <any>{
            errors: [{type: OrderErrorType.ship}],
            reference: '11-ref',
        };
        queryParams$.next();
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(1);
        expect(warn[0].querySelector('span').textContent.trim()).toEqual('We were unable to ship your order 11-ref.');
    });

    it('should display a ship error with a reason', () => {
        component.order = <any>{
            errors: [{type: OrderErrorType.ship, message: 'some reason'}],
            reference: '11-ref',
        };
        queryParams$.next();
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(1);
        expect(warn[0].querySelector('span').textContent.trim()).toEqual('We were unable to ship your order 11-ref. Reason: some reason');
    });

    it('should display only a ship error if we have a `errorType` query param, specifying that we have a ship error,' +
        'and we also have an acknowledge error in the errors list', () => {
        component.order = <any>{
            errors: [{type: OrderErrorType.acknowledge}],
            reference: '11-ref',
        };
        queryParams$.next({errorType: OrderErrorType.ship});
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(1);
        expect(warn[0].querySelector('span').textContent.trim()).toEqual('We were unable to ship your order 11-ref.');
    });

    it('should display only a ship error with a reason if we have a `errorType` query param, specifying that we have a ship error', () => {
        component.order = <any>{
            errors: [
                {type: OrderErrorType.acknowledge},
                {type: OrderErrorType.ship, message: 'some reason'},
            ],
            reference: '11-ref',
        };
        queryParams$.next({errorType: OrderErrorType.ship});
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(1);
        expect(warn[0].querySelector('span').textContent.trim()).toEqual('We were unable to ship your order 11-ref. Reason: some reason');
    });

    it('should display an acknowledge error', () => {
        component.order = <any>{
            errors: [{type: OrderErrorType.acknowledge}],
            reference: '11-ref',
        };
        queryParams$.next();
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(1);
        expect(warn[0].querySelector('span').textContent.trim()).toEqual('We were unable to import your order 11-ref.');
    });

    it('should display an acknowledge error with a reason', () => {
        component.order = <any>{
            errors: [{type: OrderErrorType.acknowledge, message: 'some reason'}],
            reference: '11-ref',
        };
        queryParams$.next();
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(1);
        expect(warn[0].querySelector('span').textContent.trim()).toEqual('We were unable to import your order 11-ref. Reason: some reason');
    });


    it('should display only an acknowledge error if we have a `errorType` query param, specifying that we have a acknowledge error,' +
        'and we also have a ship error in the errors list', () => {
        component.order = <any>{
            errors: [{type: OrderErrorType.ship}],
            reference: '11-ref',
        };

        queryParams$.next({errorType: OrderErrorType.acknowledge});
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(1);
        expect(warn[0].querySelector('span').textContent.trim()).toEqual('We were unable to import your order 11-ref.');
    });

    it('should display only an acknowledge error with a reason if we have a `errorType` query param, specifying that we have a acknowledge error', () => {
        component.order = <any>{
            errors: [
                {type: OrderErrorType.ship},
                {type: OrderErrorType.acknowledge, message: 'trql'},
            ],
            reference: '11-ref',
        };

        queryParams$.next({errorType: OrderErrorType.acknowledge});
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(1);
        expect(warn[0].querySelector('span').textContent.trim()).toEqual('We were unable to import your order 11-ref. Reason: trql');
    });

    it('should display the first message from errors list if errorType param is invalid', () => {
        component.order = <any>{
            errors: [
                {type: OrderErrorType.ship, message: 'qwer'},
            ],
            reference: '11-ref',
        };

        queryParams$.next({errorType: 'somethinginvalid'});
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(1);
        expect(warn[0].querySelector('span').textContent.trim()).toEqual('We were unable to ship your order 11-ref. Reason: qwer');
    });

    it('should NOT display errors when errors array is empty', () => {
        component.order = <any>{
            errors: [],
            reference: '11-ref',
        };
        queryParams$.next();
        fixture.detectChanges();
        let warn = fixture.debugElement.nativeElement.querySelectorAll('.sf-warn-alert');
        expect(warn.length).toEqual(0);
    });

});
