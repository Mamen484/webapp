import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';

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

    displayedColumns = ['date', 'flatFee', 'commission', 'totalAmount', 'csv'];

    constructor(protected route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(({billingStore, invoices}) => {
            this.store = billingStore;
            this.invoices = invoices;
        })
    }

    getCsv(invoice: Invoice, event) {
        event.preventDefault();
        const data = {
            month: invoice.month,
            subscriptionAmount: invoice.subscriptionAmount,
            commissionAmount: invoice.commissionAmount,
            total: invoice.subscriptionAmount + invoice.commissionAmount,
        };
        const csv = new ngxCsv([data], 'invoice ' + invoice.id);
    }

}
