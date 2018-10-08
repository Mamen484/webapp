import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTableSmallComponent } from './orders-table-small.component';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { MatTableModule } from '@angular/material';
import { EMPTY } from 'rxjs';
import { BlankPipe } from '../order-details/items-table/items-table.component.spec';

describe('OrdersTableSmallComponent', () => {
    let component: OrdersTableSmallComponent;
    let fixture: ComponentFixture<OrdersTableSmallComponent>;

    let ordersService: jasmine.SpyObj<OrdersService>;
    let cdr: jasmine.SpyObj<ChangeDetectorRef>;
    let filterService: jasmine.SpyObj<OrdersFilterService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async(() => {
        ordersService = jasmine.createSpyObj(['fetchOrdersList']);
        cdr = jasmine.createSpyObj(['detectChanges', 'markForCheck']);
        filterService = jasmine.createSpyObj(['getFilter']);
        router = jasmine.createSpyObj(['navigate']);

        TestBed.configureTestingModule({
            declarations: [OrdersTableSmallComponent, SfCurrencyPipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: OrdersService, useValue: ordersService},
                {provide: ChangeDetectorRef, useValue: cdr},
                {provide: OrdersFilterService, useValue: filterService},
                {provide: Router, useValue: router},
            ],
            imports: [MatTableModule]
        })
            .compileComponents();

    }));

    beforeEach(() => {
        filterService.getFilter.and.returnValue(EMPTY);

        fixture = TestBed.createComponent(OrdersTableSmallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Pipe({name: 'sfCurrency'})
class SfCurrencyPipe extends BlankPipe implements PipeTransform {
}
