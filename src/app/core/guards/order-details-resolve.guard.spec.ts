import { fakeAsync, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { OrderDetailsResolveGuard } from './order-details-resolve.guard';
import { AppState } from '../entities/app-state';
import { OrdersService } from '../services/orders.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BlankComponent } from '../../shared/blank.component';
import { EMPTY, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('OrderDetailsResolveGuard', () => {
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let guard: OrderDetailsResolveGuard;
    let router: Router;
    beforeEach(() => {
        appStore = jasmine.createSpyObj(['select']);
        ordersService = jasmine.createSpyObj(['fetchOrder']);
        TestBed.configureTestingModule({
            declarations: [BlankComponent],
            providers: [
                OrderDetailsResolveGuard,
                {provide: Store, useValue: appStore},
                {provide: OrdersService, useValue: ordersService},
            ],
            imports: [
                RouterTestingModule.withRoutes([
                    {path: 'order-not-found', component: BlankComponent},
                    {path: 'critical-error', component: BlankComponent}
                ]),
            ]
        });
    });

    beforeEach(() => {
        guard = TestBed.get(OrderDetailsResolveGuard);
        router = TestBed.get(Router);
    });


    it('should fetch an order for the current store', async() => {
        appStore.select.and.returnValue(of({id: '21'}));
        ordersService.fetchOrder.and.returnValue(EMPTY);
        await guard.resolve(<any>{params: {id: '45'}}, <any>{}).toPromise();
        expect(ordersService.fetchOrder).toHaveBeenCalledWith('21', '45');
    });

    it('should redirect to the order-not-found route when a 404 error returned', async () => {
        appStore.select.and.returnValue(of({id: '21'}));
        ordersService.fetchOrder.and.returnValue(throwError({status: 404}));
        await guard.resolve(<any>{params: {id: '45'}}, <any>{}).toPromise();
        expect(router.isActive('/order-not-found', true)).toEqual(true);
    });

    it('should redirect to the critical-error route when a NON 404 error returned', async () => {
        appStore.select.and.returnValue(of({id: '21'}));
        ordersService.fetchOrder.and.returnValue(throwError({status: 401}));
        await guard.resolve(<any>{params: {id: '45'}}, <any>{}).toPromise();
        expect(router.isActive('/critical-error', true)).toEqual(true);
    });


});
