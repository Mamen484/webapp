import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ngxCsv} from 'ngx-csv/ngx-csv';

import {BillingStore} from '../billing-store';
import {Invoice} from './invoice';
import {BillingStoreService} from '../billing-store.service';
import {InvoiceOrder} from './invoice-order';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {TableOperations} from 'sfl-tools/table-operations';

@Component({
    selector: 'sfa-invoicing-details',
    templateUrl: './invoicing-details.component.html',
    styleUrls: ['./invoicing-details.component.scss']
})
export class InvoicingDetailsComponent extends TableOperations<InvoiceOrder> implements OnInit {

    store: BillingStore;

    displayedColumns = ['date', 'flatFee', 'commission', 'totalAmount', 'csv'];

    constructor(protected route: ActivatedRoute, protected billingStore: BillingStoreService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.route.data.subscribe(({billingStore}) => {
            this.store = billingStore;
        });
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

            const csv = new ngxCsv(data, invoice.storeName + '_' + invoice.month, {
                fieldSeparator: ';',
                decimalseparator: ',',
            });
        });

    }

    protected fetchCollection(params: { limit: number; page: number; search: string }): Observable<{ total: number; dataList: any[] }> {
        return this.route.paramMap.pipe(
            flatMap(paramsMap => this.billingStore.fetchInvoicesCollection(Number(paramsMap.get('storeId')), params)),
            map(response => ({
                total: response.total,
                dataList: response._embedded.invoice,
            })),
        )
    }


}
