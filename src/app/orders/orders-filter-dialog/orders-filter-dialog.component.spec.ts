import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersFilterDialogComponent } from './orders-filter-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { OrdersFilter } from '../../core/entities/orders/orders-filter';
import { EMPTY } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrdersFilterDialogComponent', () => {
    let dialogRef: jasmine.SpyObj<MatDialogRef<OrdersFilterDialogComponent>>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let component: OrdersFilterDialogComponent;
    let fixture: ComponentFixture<OrdersFilterDialogComponent>;

    beforeEach(async(() => {
        dialogRef = jasmine.createSpyObj(['close']);
        appStore = jasmine.createSpyObj(['select']);

        TestBed.configureTestingModule({
            providers: [
                {provide: MatDialogRef, useValue: dialogRef},
                {provide: Store, useValue: appStore},
                {provide: MAT_DIALOG_DATA, useValue: new OrdersFilter()},
            ],
            declarations: [
                OrdersFilterDialogComponent
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        let baseTime = new Date(Date.UTC(2017, 5, 14, 2, 22, 41));
        jasmine.clock().mockDate(baseTime);
    }));

    describe('intialization', () => {
        it('should change date to `anytime` if `since` filter is empty', () => {
            let filter = new OrdersFilter();
            filter.since = undefined;
            filter.until = new Date();
            appStore.select.and.returnValue(EMPTY);
            fixture = TestBed.createComponent(OrdersFilterDialogComponent);
            component = fixture.componentInstance;
            component.filter = filter;
            fixture.detectChanges();
            expect(component.filter.since).not.toBeDefined();
            expect(component.filter.until).not.toBeDefined();
            expect(component.dateOption).toEqual('anytime');
        });

        it('should change date to `custom` if `since` filter is NOT empty', () => {
            let filter = new OrdersFilter();
            filter.since = new Date(Date.UTC(2017, 5, 14, 2, 22, 41));
            filter.until = new Date(Date.UTC(2017, 5, 14, 2, 22, 42));
            appStore.select.and.returnValue(EMPTY);
            fixture = TestBed.createComponent(OrdersFilterDialogComponent);
            component = fixture.componentInstance;
            component.filter = filter;
            fixture.detectChanges();
            expect(component.filter.since.getTime()).toEqual(1497406961000);
            expect(component.filter.until.getTime()).toEqual(1497406962000);
            expect(component.dateOption).toEqual('custom');
        });
    });

    describe('', () => {
        beforeEach(() => {
            appStore.select.and.returnValue(EMPTY);
            fixture = TestBed.createComponent(OrdersFilterDialogComponent);
            component = fixture.componentInstance;
            component.filter = new OrdersFilter();
            fixture.detectChanges();
        });

        it('should assign a filter value on construction', () => {
            expect(component.filter instanceof OrdersFilter).toEqual(true);
        });

        it('should assign a `since` property when `today` is passed to changeDate', () => {
            component.changeDate('today');
            expect(component.filter.since.getFullYear()).toEqual(2017);
            expect(component.filter.since.getMonth()).toEqual(5);
            expect(component.filter.since.getDate()).toEqual(14);
            expect(component.filter.since.getHours()).toEqual(0);
            expect(component.filter.since.getMinutes()).toEqual(0);
            expect(component.filter.since.getSeconds()).toEqual(0);
        });

        it('should assign a `since` property to current day subtract 7 days when a `week` is passed to changeDate', () => {
            component.changeDate('week');
            expect(component.filter.since.getTime()).toEqual(1496802161000); // 2017-06-07 2:22:41
        });

        it('should assign a `since` property to current day subtract 30 days when a `month` is passed to changeDate', () => {
            component.changeDate('month');
            expect(component.filter.since.getTime()).toEqual(1494814961000); // 2017-05-15 2:22:41
        });

        it('should assign a `since` property to the beginning of a current month when `currentMonth` is passed to changeDate', () => {
            component.changeDate('currentMonth');
            expect(component.filter.since.getFullYear()).toEqual(2017);
            expect(component.filter.since.getMonth()).toEqual(5);
            expect(component.filter.since.getDate()).toEqual(1);
            expect(component.filter.since.getHours()).toEqual(0);
            expect(component.filter.since.getMinutes()).toEqual(0);
            expect(component.filter.since.getSeconds()).toEqual(0);
            expect(component.filter.since.getMilliseconds()).toEqual(0);
        });

        it('should remove an `until` property on changeDate call with `today` passing in', () => {
            component.filter.until = new Date();
            expect(component.filter.until.getTime()).toEqual(1497406961000);
            component.changeDate('today');
            expect(component.filter.until).not.toBeDefined();
        });

        it('should remove an `until` property on changeDate call with `week` passing in', () => {
            component.filter.until = new Date();
            expect(component.filter.until.getTime()).toEqual(1497406961000);
            component.changeDate('week');
            expect(component.filter.until).not.toBeDefined();
        });

        it('should remove an `until` property on changeDate call with `month` passing in', () => {
            component.filter.until = new Date();
            expect(component.filter.until.getTime()).toEqual(1497406961000);
            component.changeDate('month');
            expect(component.filter.until).not.toBeDefined();
        });

        it('should remove an `until` property on changeDate call with `currentMonth` passing in', () => {
            component.filter.until = new Date();
            expect(component.filter.until.getTime()).toEqual(1497406961000);
            component.changeDate('currentMonth');
            expect(component.filter.until).not.toBeDefined();
        });

        it('should assign a `since` and `until` properties when `yesterday` is passed to changeDate', () => {
            component.changeDate('yesterday');
            expect(component.filter.since.getFullYear()).toEqual(2017);
            expect(component.filter.since.getMonth()).toEqual(5);
            expect(component.filter.since.getDate()).toEqual(13);
            expect(component.filter.since.getHours()).toEqual(0);
            expect(component.filter.since.getMinutes()).toEqual(0);
            expect(component.filter.since.getSeconds()).toEqual(0);

            expect(component.filter.until.getFullYear()).toEqual(2017);
            expect(component.filter.until.getMonth()).toEqual(5);
            expect(component.filter.until.getDate()).toEqual(13);
            expect(component.filter.until.getHours()).toEqual(23);
            expect(component.filter.until.getMinutes()).toEqual(59);
            expect(component.filter.until.getSeconds()).toEqual(59);
        });

        it('should remove `since` and `until` properties on changeDate call with `anytime` passing in', () => {
            component.filter.until = new Date();
            component.filter.since = new Date();
            expect(component.filter.until.getTime()).toEqual(1497406961000);
            expect(component.filter.since.getTime()).toEqual(1497406961000);
            component.changeDate('anytime');
            expect(component.filter.until).not.toBeDefined();
            expect(component.filter.since).not.toBeDefined();
        });

        it('should pass a filter into OrdersFilterService and close the dialog on applyFilter() call', () => {
            component.applyFilter();
            expect(dialogRef.close).toHaveBeenCalledTimes(1);
            expect(dialogRef.close).toHaveBeenCalledWith(new OrdersFilter());
        });

        it('should assign a `since` filter property on setSince() call ', () => {
            component.setSince(1496802161000);
            expect(component.filter.since.getTime()).toEqual(1496802161000);
        });

        it('should assign an `until` filter property on setUntil() call ', () => {
            expect(component.filter.until).not.toBeDefined();
            component.setUntil(1496802161000);
            expect(component.filter.until.getTime()).toEqual(1496802161000);
        });
    });


});
