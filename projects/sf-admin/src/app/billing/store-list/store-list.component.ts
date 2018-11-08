import { Component, OnInit } from '@angular/core';
import { BillingStore } from '../billing-store';
import { BillingService } from '../billing.service';


const ELEMENT_DATA: BillingStore[] = [
    {commissionRate: 1, name: 'Store 1', monthlySubscriptionAmount: 200, firstDayOfInvoice: new Date().toJSON()},
    {commissionRate: 2, name: 'Store 2', monthlySubscriptionAmount: 250, firstDayOfInvoice: new Date().toJSON()},
];

@Component({
    selector: 'sfa-store-list',
    templateUrl: './store-list.component.html',
    styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

    dataSource;
    displayedColumns: string[] = ['name', 'price', 'commission', 'trialEndDate'];

    constructor(protected billingService: BillingService) {
    }

    ngOnInit() {
        this.dataSource = ELEMENT_DATA;
    // this.billingService.fetchStoreCollection().subscribe(storeList => this.storeList = storeList._embedded.store);
    }

}
