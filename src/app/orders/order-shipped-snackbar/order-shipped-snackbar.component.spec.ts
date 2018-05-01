import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShippedSnackbarComponent } from './order-shipped-snackbar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

describe('OrderShippedSnackbarComponent', () => {
    let component: OrderShippedSnackbarComponent;
    let fixture: ComponentFixture<OrderShippedSnackbarComponent>;
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [OrderShippedSnackbarComponent],
            providers: [
                {provide: MAT_SNACK_BAR_DATA, useValue: {plural: true, action: 'ship'}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderShippedSnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
