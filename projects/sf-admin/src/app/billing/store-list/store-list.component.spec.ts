import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreListComponent } from './store-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { BillingService } from '../billing.service';

describe('StoreListComponent', () => {
    let component: StoreListComponent;
    let fixture: ComponentFixture<StoreListComponent>;
    let billingService: jasmine.SpyObj<BillingService>;

    beforeEach(async(() => {
        billingService = jasmine.createSpyObj('BillingService', ['fetchStoreList']);
        TestBed.configureTestingModule({
            declarations: [StoreListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatTableModule],
            providers: [
                {provide: BillingService, useValue: billingService}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoreListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
