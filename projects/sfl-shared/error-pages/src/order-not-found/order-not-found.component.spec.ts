import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNotFoundComponent } from './order-not-found.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrderNotFoundComponent', () => {
    let component: OrderNotFoundComponent;
    let fixture: ComponentFixture<OrderNotFoundComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrderNotFoundComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderNotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
