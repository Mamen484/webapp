import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderErrorsAlertComponent } from './order-errors-alert.component';
import { OrdersService } from '../../../../core/services/orders.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EMPTY } from 'rxjs';

describe('OrderErrorsAlertComponent', () => {
    let component: OrderErrorsAlertComponent;
    let fixture: ComponentFixture<OrderErrorsAlertComponent>;
    let ordersService: jasmine.SpyObj<OrdersService>;

    beforeEach(async(() => {
        ordersService = jasmine.createSpyObj('OrdersService spy', ['fetchOrdersList']);
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [OrderErrorsAlertComponent],
            providers: [
                {provide: OrdersService, useValue: ordersService},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderErrorsAlertComponent);
        component = fixture.componentInstance;
        ordersService.fetchOrdersList.and.returnValue(EMPTY);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not show the alert when no shopping errors and no import errors', () => {
        component.importErrorsNumber = 0;
        component.shippingErrorsNumber = 0;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('');
    });

    it('should show an appropriate message when there are errors', () => {
        component.importErrorsNumber = 10;
        component.shippingErrorsNumber = 12;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('errorYou have 10 import errors and 12 shipping errors.');
    });

    it('should put the errors number > 0 into a link', () => {
        component.importErrorsNumber = 10;
        component.shippingErrorsNumber = 12;
        fixture.detectChanges();
        const links = fixture.debugElement.nativeElement.querySelectorAll('a');
        expect(links.length).toBe(2);
        expect(links[0].textContent).toBe('10 import errors');
        expect(links[1].textContent).toBe('12 shipping errors');
    });

    it('should NOT put the errors number is 0 into a link', () => {
        component.importErrorsNumber = 0;
        component.shippingErrorsNumber = 0;
        fixture.detectChanges();
        const links = fixture.debugElement.nativeElement.querySelectorAll('a');
        expect(links.length).toBe(0);
    });

    it('should show an appropriate message when there is 1 error', () => {
        component.importErrorsNumber = 1;
        component.shippingErrorsNumber = 51;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('errorYou have 1 import error and 51 shipping errors.');
    });

    it('should show an appropriate message when there is 0 import errors', () => {
        component.importErrorsNumber = 0;
        component.shippingErrorsNumber = 21;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('errorYou have 0 import errors and 21 shipping errors.');
    });

    it('should show an appropriate message when there is 0 shipping errors', () => {
        component.importErrorsNumber = 191;
        component.shippingErrorsNumber = 0;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent).toBe('errorYou have 191 import errors and 0 shipping errors.');
    });
});
