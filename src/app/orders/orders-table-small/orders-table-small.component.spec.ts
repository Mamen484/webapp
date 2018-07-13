import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTableSmallComponent } from './orders-table-small.component';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../core/entities/app-state';
import { OrdersService } from '../../core/services/orders.service';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { MatTableModule } from '@angular/material';
import { EMPTY } from 'rxjs';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';

describe('OrdersTableSmallComponent', () => {
    let component: OrdersTableSmallComponent;
    let fixture: ComponentFixture<OrdersTableSmallComponent>;

    let appStore: jasmine.SpyObj<Store<AppState>>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let cdr: jasmine.SpyObj<ChangeDetectorRef>;
    let filterService: jasmine.SpyObj<OrdersFilterService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj(['select']);
        ordersService = jasmine.createSpyObj(['fetchOrdersList']);
        cdr = jasmine.createSpyObj(['detectChanges', 'markForCheck']);
        filterService = jasmine.createSpyObj(['getFilter']);
        router = jasmine.createSpyObj(['navigate']);

        TestBed.configureTestingModule({
            declarations: [OrdersTableSmallComponent, SfCurrencyPipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: appStore},
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
        appStore.select.and.returnValue(EMPTY);
        filterService.getFilter.and.returnValue(EMPTY);

        fixture = TestBed.createComponent(OrdersTableSmallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
