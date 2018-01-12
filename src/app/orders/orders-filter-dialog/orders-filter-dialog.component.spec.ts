import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { OrdersFilterDialogComponent } from './orders-filter-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { OrdersFilter } from '../../core/entities/orders-filter';
import { Observable } from 'rxjs/Observable';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrdersFilterDialogComponent', () => {
    let dialogRef: jasmine.SpyObj<MatDialogRef<OrdersFilterDialogComponent>>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let ordersFilterService: jasmine.SpyObj<OrdersFilterService>;
    let component: OrdersFilterDialogComponent;
    let fixture: ComponentFixture<OrdersFilterDialogComponent>;

    beforeEach(async(() => {
        dialogRef = jasmine.createSpyObj(['close']);
        appStore = jasmine.createSpyObj(['select']);
        ordersFilterService = jasmine.createSpyObj(['getFilter', 'setFilter']);

        TestBed.configureTestingModule({
            providers: [
                {provide: MatDialogRef, useValue: dialogRef},
                {provide: Store, useValue: appStore},
                {provide: OrdersFilterService, useValue: ordersFilterService},
            ],
            declarations: [
                OrdersFilterDialogComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        let baseTime = new Date(2017, 5, 14, 2, 22, 41);
        jasmine.clock().mockDate(baseTime);
    }));

    describe('intialization', () => {
        it('should change date to `anytime` if `since` filter is empty', () => {
            let filter = new OrdersFilter();
            filter.since = undefined;
            filter.until = new Date();
            ordersFilterService.getFilter.and.returnValue(Observable.of(filter));
            appStore.select.and.returnValue(Observable.empty());
            fixture = TestBed.createComponent(OrdersFilterDialogComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component.filter.since).not.toBeDefined();
            expect(component.filter.until).not.toBeDefined();
            expect(component.dateOption).toEqual('anytime');
        });

        it('should change date to `custom` if `since` filter is NOT empty', () => {
            let filter = new OrdersFilter();
            filter.since = new Date(1497387600000);
            filter.until = new Date(1497387600001);
            ordersFilterService.getFilter.and.returnValue(Observable.of(filter));
            appStore.select.and.returnValue(Observable.empty());
            fixture = TestBed.createComponent(OrdersFilterDialogComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component.filter.since.getTime()).toEqual(1497387600000);
            expect(component.filter.until.getTime()).toEqual(1497387600001);
            expect(component.dateOption).toEqual('custom');
        });
    });

    describe('', () => {
        beforeEach(() => {
            ordersFilterService.getFilter.and.returnValue(Observable.of(new OrdersFilter()));
            appStore.select.and.returnValue(Observable.empty());

            fixture = TestBed.createComponent(OrdersFilterDialogComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

        it('should assign a filter value on construction', () => {
            expect(component.filter instanceof OrdersFilter).toEqual(true);
        });

        it('should assign a `since` property when `today` is passed to changeDate', () => {
            component.changeDate('today');
            expect(component.filter.since.getTime()).toEqual(1497387600000); // 2017-06-14 0:00:00
        });

        it('should assign a `since` property to current day subtract 7 days when a `week` is passed to changeDate', () => {
            component.changeDate('week');
            expect(component.filter.since.getTime()).toEqual(1496791361000); // 2017-06-07 2:22:41
        });

        it('should assign a `since` property to current day subtract 30 days when a `month` is passed to changeDate', () => {
            component.changeDate('month');
            expect(component.filter.since.getTime()).toEqual(1494804161000); // 2017-05-15 2:22:41
        });

        it('should remove an `until` property on changeDate call with `today` passing in', () => {
            component.filter.until = new Date();
            expect(component.filter.until.getTime()).toEqual(1497396161000);
            component.changeDate('today');
            expect(component.filter.until).not.toBeDefined();
        });

        it('should remove an `until` property on changeDate call with `week` passing in', () => {
            component.filter.until = new Date();
            expect(component.filter.until.getTime()).toEqual(1497396161000);
            component.changeDate('week');
            expect(component.filter.until).not.toBeDefined();
        });

        it('should remove an `until` property on changeDate call with `month` passing in', () => {
            component.filter.until = new Date();
            expect(component.filter.until.getTime()).toEqual(1497396161000);
            component.changeDate('month');
            expect(component.filter.until).not.toBeDefined();
        });

        it('should remove `since` and `until` properties on changeDate call with `anytime` passing in', () => {
            component.filter.until = new Date();
            component.filter.since = new Date();
            expect(component.filter.until.getTime()).toEqual(1497396161000);
            expect(component.filter.since.getTime()).toEqual(1497396161000);
            component.changeDate('anytime');
            expect(component.filter.until).not.toBeDefined();
            expect(component.filter.since).not.toBeDefined();
        });

        it('should close a dialog on close() call', () => {
            expect(dialogRef.close).not.toHaveBeenCalled()
            component.close();
            expect(dialogRef.close).toHaveBeenCalledTimes(1);
        });

        it('should pass a filter into OrdersFilterService and close the dialog on applyFilter() call', () => {
            component.applyFilter();
            expect(ordersFilterService.setFilter).toHaveBeenCalled();
            expect(dialogRef.close).toHaveBeenCalledTimes(1);
        });

        it('should assign a `since` filter property on setSince() call ', () => {
            expect(component.filter.since).not.toBeDefined();
            component.setSince(1496791361000);
            expect(component.filter.since.getTime()).toEqual(1496791361000);
        });

        it('should assign an `until` filter property on setUntil() call ', () => {
            expect(component.filter.until).not.toBeDefined();
            component.setUntil(1496791361000);
            expect(component.filter.until.getTime()).toEqual(1496791361000);
        });
    });


});
