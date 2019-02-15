import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersLeftNavComponent } from './orders-left-nav.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { EMPTY } from 'rxjs';

describe('OrdersLeftNavComponent', () => {
    let component: OrdersLeftNavComponent;
    let fixture: ComponentFixture<OrdersLeftNavComponent>;
    let appStore: jasmine.SpyObj<Store<AppState>>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj('Store spy', ['select']);
        TestBed.configureTestingModule({
            declarations: [OrdersLeftNavComponent],
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
