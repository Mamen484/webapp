import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialog, MatSnackBar, MatTableModule } from '@angular/material';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { OrderDetailsComponent } from './order-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CarrierInfo } from '../../core/entities/carrier-info';
import { OrderStatusChangedSnackbarComponent } from '../order-status-changed-snackbar/order-status-changed-snackbar.component';


describe('OrderDetailsComponent', () => {
    let component: OrderDetailsComponent;
    let fixture: ComponentFixture<OrderDetailsComponent>;
    let matDialog: jasmine.SpyObj<MatDialog>;
    let route;
    let snackbar: jasmine.SpyObj<MatSnackBar>;

    beforeEach(async(() => {
        matDialog = jasmine.createSpyObj(['open']);
        route = {};
        snackbar = jasmine.createSpyObj(['openFromComponent']);
        TestBed.configureTestingModule({
            declarations: [OrderDetailsComponent, RemoveUnderlinePipe, SfCurrencyPipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialog, useValue: matDialog},
                {provide: ActivatedRoute, useValue: route},
                {provide: MatSnackBar, useValue: snackbar},
            ],
            imports: [MatTableModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderDetailsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open snackbar if shipping is confirmed', () => {
        matDialog.open.and.returnValue({afterClosed: () => of(new CarrierInfo())});
        component.shipOrder();
        expect(snackbar.openFromComponent).toHaveBeenCalledTimes(1);
        expect(snackbar.openFromComponent.calls.mostRecent().args[0]).toEqual(OrderStatusChangedSnackbarComponent);
    });

    it('should NOT open snackbar if shipping is cancelled', () => {
        matDialog.open.and.returnValue({afterClosed: () => of(null)});
        component.shipOrder();
        expect(snackbar.openFromComponent).not.toHaveBeenCalled();
    });
});


export class BlankPipe implements PipeTransform {
    transform(value: any): any {
        return value;
    }
}

@Pipe({name: 'removeUnderline'})
export class RemoveUnderlinePipe extends BlankPipe implements PipeTransform {
}

@Pipe({name: 'sfCurrency'})
export class SfCurrencyPipe extends BlankPipe implements PipeTransform {
}