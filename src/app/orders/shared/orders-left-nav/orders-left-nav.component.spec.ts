import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';


import { OrdersLeftNavComponent } from './orders-left-nav.component';
import { AppState } from '../../../core/entities/app-state';
import { AddStoreParamGuard } from '../../../core/guards/add-store-param.guard';
import { Router } from '@angular/router';
import { OrdersView } from '../../../core/entities/orders/orders-view.enum';

describe('OrdersLeftNavComponent', () => {
    let component: OrdersLeftNavComponent;
    let fixture: ComponentFixture<OrdersLeftNavComponent>;
    let appStore: jasmine.SpyObj<Store<AppState>>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj('Store spy', ['select']);
        TestBed.configureTestingModule({
            declarations: [OrdersLeftNavComponent, MockComponent],
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: '', canActivateChild: [AddStoreParamGuard], children: [
                            {path: '', component: OrdersLeftNavComponent},
                            {path: 'orders', component: MockComponent}
                        ]
                    }
                ])
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: appStore},
                AddStoreParamGuard,
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

    describe('click on a filtering link', () => {

        let location: Location;
        let router: Router;

        beforeEach(fakeAsync(() => {
            appStore.select.and.returnValue(of({id: 461}));
            location = TestBed.get(Location);
            router = TestBed.get(Router);
            // initialize the first route to add a store param by AddStoreParamGuard BEFORE clicking on a link
            // (the same process as we have in real life, when the page is rendered, and only then we click on a filtering link)
            router.navigate(['/']);
            tick();
            expect(location.path()).toBe('/?store=461');
        }));

        [
            {linkTitle: 'All orders', domIndex: 1, viewIndex: OrdersView.allOrders},
            {linkTitle: 'To validate', domIndex: 2, viewIndex: OrdersView.toValidate},
            {linkTitle: 'Import errors', domIndex: 3, viewIndex: OrdersView.importErrors},
            {linkTitle: 'To ship', domIndex: 4, viewIndex: OrdersView.toShip},
            {linkTitle: 'Shipping errors', domIndex: 5, viewIndex: OrdersView.shippingErrors},
            {linkTitle: 'Shipped', domIndex: 6, viewIndex: OrdersView.shipped},
        ].forEach(spec => {
            it(`should keep a store param when the link is ${spec.linkTitle}`, fakeAsync(() => {

                const elem = fixture.elementRef.nativeElement.querySelectorAll('mat-list-item')[spec.domIndex];
                expect(elem.textContent).toBe(spec.linkTitle);
                fixture.detectChanges();
                elem.click();
                tick();
                expect(location.path()).toBe(`/orders?store=461&view=${spec.viewIndex}`);
            }));
        });
    });


});

@Component({
    template: '',
})
class MockComponent {
}
