import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DashboardDataService } from './dashboard-data.service';
import { Store } from '@ngrx/store';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let dashboardDataService: jasmine.SpyObj<DashboardDataService>;
    let store: jasmine.SpyObj<Store>;


    beforeEach(async () => {
        dashboardDataService = jasmine.createSpyObj(['getData']);
        store = jasmine.createSpyObj(['select']);

        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            providers: [
                {provide: DashboardDataService, useValue: dashboardDataService},
                {provide: Store, useValue: store},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
