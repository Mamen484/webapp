import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersListComponent } from './orders-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

describe('OrdersListComponent', () => {
    let component: OrdersListComponent;
    let fixture: ComponentFixture<OrdersListComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrdersListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: {queryParams: new Subject()}},
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

});
