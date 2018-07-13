import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListDesktopComponent } from './orders-list-desktop.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrdersListDesktopComponent', () => {
    let component: OrdersListDesktopComponent;
    let fixture: ComponentFixture<OrdersListDesktopComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrdersListDesktopComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersListDesktopComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
