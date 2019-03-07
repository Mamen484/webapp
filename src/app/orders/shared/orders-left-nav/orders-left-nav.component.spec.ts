import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersLeftNavComponent } from './orders-left-nav.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { EMPTY } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OrdersLeftNavComponent', () => {
    let component: OrdersLeftNavComponent;
    let fixture: ComponentFixture<OrdersLeftNavComponent>;
    let appStore: jasmine.SpyObj<Store<AppState>>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj('Store spy', ['select']);
        TestBed.configureTestingModule({
            declarations: [OrdersLeftNavComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: appStore},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersLeftNavComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        appStore.select.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
