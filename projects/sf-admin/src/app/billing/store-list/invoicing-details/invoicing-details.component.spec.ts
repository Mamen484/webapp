import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicingDetailsComponent } from './invoicing-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { BillingStoreService } from '../billing-store.service';

describe('InvoicingDetailsComponent', () => {
    let component: InvoicingDetailsComponent;
    let fixture: ComponentFixture<InvoicingDetailsComponent>;
    let billingStoreService: jasmine.SpyObj<BillingStoreService>;

    beforeEach(async(() => {
        billingStoreService = jasmine.createSpyObj('BillingStoreService spy', ['fetchInvoiceOrders']);
        TestBed.configureTestingModule({
            imports: [MatTableModule],
            declarations: [InvoicingDetailsComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: {data: of({billingStore: {}, invoices: []})}},
                {provide: BillingStoreService, useValue: billingStoreService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InvoicingDetailsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        billingStoreService.fetchInvoiceOrders.and.returnValue(EMPTY);
        expect(component).toBeTruthy();
    });
});
