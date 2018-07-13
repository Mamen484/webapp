import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersListComponent } from './orders-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

describe('OrdersListComponent', () => {
    let component: OrdersListComponent;
    let fixture: ComponentFixture<OrdersListComponent>;
    let media: jasmine.SpyObj<ObservableMedia>;

    beforeEach(async(() => {
        media = jasmine.createSpyObj(['subscribe', 'isActive']);
        TestBed.configureTestingModule({
            declarations: [OrdersListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ObservableMedia, useValue: media}
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
