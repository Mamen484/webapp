import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersListComponent } from './orders-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';

describe('OrdersListComponent', () => {
    let component: OrdersListComponent;
    let fixture: ComponentFixture<OrdersListComponent>;
    let titleService: jasmine.SpyObj<Title>;

    beforeEach(async(() => {
        titleService = jasmine.createSpyObj('Title', ['setTitle']);
        TestBed.configureTestingModule({
            declarations: [OrdersListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: {queryParams: new Subject()}},
                {provide: Title, useValue: titleService},
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

    it('should set the page title', () => {
        expect(titleService.setTitle).toHaveBeenCalledWith('Shoppingfeed / Orders Dashboard');
    });

});
