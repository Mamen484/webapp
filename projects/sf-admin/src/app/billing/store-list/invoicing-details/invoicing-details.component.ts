import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingStore } from '../billing-store';
import { Invoice } from './invoice';

@Component({
    selector: 'sfa-invoicing-details',
    templateUrl: './invoicing-details.component.html',
    styleUrls: ['./invoicing-details.component.scss']
})
export class InvoicingDetailsComponent implements OnInit {

    store: BillingStore;
    invoices: Invoice[] = [];

    displayedColumns = ['date', 'flatFee', 'commission', 'totalAmount'];

    constructor(protected route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(({billingStore, invoices}) => {
            this.store = billingStore;
            this.invoices = invoices;
        })
    }

}
