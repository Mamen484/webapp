import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsComponent } from './order-details.component';
import { Subject } from 'rxjs';
import { Order } from '../../core/entities/orders/order';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrderDetailsComponent', () => {
    let component: OrderDetailsComponent;
    let fixture: ComponentFixture<OrderDetailsComponent>;

    let dataSubject$: Subject<{ order: Order }>;
    let route;

    beforeEach(async(() => {

        dataSubject$ = new Subject();
        route = {data: dataSubject$.asObservable()};


        TestBed.configureTestingModule({
            declarations: [OrderDetailsComponent],
            providers: [
                {provide: ActivatedRoute, useValue: route},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderDetailsComponent);
        component = fixture.componentInstance;
        component.order = <any>{};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign an order', () => {
        let order = {id: 27871958984};
        dataSubject$.next(<any>{order});
        expect(component.order.id).toEqual(order.id);
    });
});
