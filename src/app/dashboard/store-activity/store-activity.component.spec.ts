import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreActivityComponent } from './store-activity.component';
import { OrdersService } from '../../core/services/orders.service';
import { StoreService } from 'sfl-shared/services';
import { EMPTY } from 'rxjs';
import { DashboardDataService } from '../dashboard-data.service';

describe('StoreActivityComponent', () => {
    let component: StoreActivityComponent;
    let fixture: ComponentFixture<StoreActivityComponent>;
    let dashboardDataService: jasmine.SpyObj<DashboardDataService>;


    beforeEach(async () => {
        dashboardDataService = jasmine.createSpyObj(['getData']);

        await TestBed.configureTestingModule({
            declarations: [StoreActivityComponent],
            providers: [
                {provide: DashboardDataService, useValue: dashboardDataService},
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StoreActivityComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
