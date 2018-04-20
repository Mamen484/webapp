import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSubnavComponent } from './orders-subnav.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrdersSubnavComponent', () => {
    let component: OrdersSubnavComponent;
    let fixture: ComponentFixture<OrdersSubnavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrdersSubnavComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersSubnavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
