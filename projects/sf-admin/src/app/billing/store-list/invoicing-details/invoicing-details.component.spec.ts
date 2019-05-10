import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicingDetailsComponent } from './invoicing-details.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material';

describe('InvoicingDetailsComponent', () => {
    let component: InvoicingDetailsComponent;
    let fixture: ComponentFixture<InvoicingDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatTableModule],
            declarations: [InvoicingDetailsComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: {data: of({billingStore: {}, invoices: []})}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InvoicingDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
