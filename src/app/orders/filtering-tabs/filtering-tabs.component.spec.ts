import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringTabsComponent } from './filtering-tabs.component';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FilteringTabsComponent', () => {
    let component: FilteringTabsComponent;
    let fixture: ComponentFixture<FilteringTabsComponent>;
    let filterService: jasmine.SpyObj<OrdersFilterService>;

    beforeEach(async(() => {
        filterService = jasmine.createSpyObj(['patchFilter']);
        TestBed.configureTestingModule({
            declarations: [FilteringTabsComponent],
            providers: [
                {provide: OrdersFilterService, useValue: filterService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilteringTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
