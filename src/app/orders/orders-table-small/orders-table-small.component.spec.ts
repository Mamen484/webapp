import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTableSmallComponent } from './orders-table-small.component';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadingFlagService } from '../../core/services/loading-flag.service';
import { Router } from '@angular/router';
import { AppState } from '../../core/entities/app-state';
import { OrdersService } from '../../core/services/orders.service';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { MatTableModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

describe('OrdersTableSmallComponent', () => {
    let component: OrdersTableSmallComponent;
    let fixture: ComponentFixture<OrdersTableSmallComponent>;

    let appStore: jasmine.SpyObj<Store<AppState>>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let cdr: jasmine.SpyObj<ChangeDetectorRef>;
    let filterService: jasmine.SpyObj<OrdersFilterService>;
    let router: jasmine.SpyObj<Router>;
    let loadingFlagService: jasmine.SpyObj<LoadingFlagService>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj(['select']);
        ordersService = jasmine.createSpyObj(['fetchOrdersList']);
        cdr = jasmine.createSpyObj(['detectChanges', 'markForCheck']);
        filterService = jasmine.createSpyObj(['getFilter']);
        router = jasmine.createSpyObj(['navigate']);
        loadingFlagService = jasmine.createSpyObj(['triggetLoadingStarted', 'triggerLoadingFinished']);

        TestBed.configureTestingModule({
            declarations: [OrdersTableSmallComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: OrdersService, useValue: ordersService},
                {provide: ChangeDetectorRef, useValue: cdr},
                {provide: OrdersFilterService, useValue: filterService},
                {provide: Router, useValue: router},
                {provide: LoadingFlagService, useValue: loadingFlagService},
            ],
            imports: [MatTableModule]
        })
            .compileComponents();

    }));

    beforeEach(() => {
        appStore.select.and.returnValue(Observable.empty());
        filterService.getFilter.and.returnValue(Observable.empty());

        fixture = TestBed.createComponent(OrdersTableSmallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
