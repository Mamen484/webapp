import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';

import { BillingStore } from '../billing-store';
import { Invoice } from './invoice';
import { BillingStoreService } from '../billing-store.service';

@Component({
    selector: 'sfa-invoicing-details',
    templateUrl: './invoicing-details.component.html',
    styleUrls: ['./invoicing-details.component.scss']
})
export class InvoicingDetailsComponent implements OnInit {

    store: BillingStore;
    invoices: Invoice[] = [];

    displayedColumns = ['date', 'flatFee', 'commission', 'totalAmount', 'csv'];

    constructor(protected route: ActivatedRoute, protected billingStore: BillingStoreService) {
    }

    ngOnInit() {
        this.route.data.subscribe(({billingStore, invoices}) => {
            this.store = billingStore;
            this.invoices = invoices;
        })
    }

    getCsv(invoice: Invoice, event) {
        event.preventDefault();

        this.billingStore.fetchInvoiceOrders(invoice.id).subscribe(response => {
            const orders = response._embedded.order;
            const data = <any>orders.map((order, index) => ({
                index: index + 1,
                channelName: order.channelName,
                reference: order.reference,
                totalAmount: order.payment.totalAmount,
                commissionedAmount: order.payment.commissionedAmount,
                currency: order.payment.currency,
            }));

            // add column headers
            data.unshift({
                index: '',
                channelName: 'channelName',
                reference: 'reference',
                totalAmount: 'totalAmount',
                commissionedAmount: 'commissionedAmount',
                currency: 'currency',
            });

            const csv = new ngxCsv(data, invoice.storeName + '_' + invoice.month);
        });

    }

}
