import { Component, OnInit } from '@angular/core';
import { BillingService } from '../billing.service';
import { MatDialog } from '@angular/material';
import { StoreDialogComponent } from '../store-dialog/store-dialog.component';
import { BillingStore } from '../billing-store';


@Component({
    selector: 'sfa-store-list',
    templateUrl: './store-list.component.html',
    styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

    dataSource: BillingStore[];
    displayedColumns: string[] = ['name', 'price', 'commission', 'trialEndDate', 'closedAt', 'edit', 'block'];
    isLoadingResults = true;

    constructor(protected billingService: BillingService, protected matDialog: MatDialog) {
    }

    ngOnInit() {
        this.billingService.fetchStoreCollection().subscribe(storeList => {
            this.dataSource = storeList._embedded.store;
            this.isLoadingResults = false;
        });
    }

    openCreateStoreDialog() {
        const id = this.dataSource.length ? this.dataSource[this.dataSource.length - 1].id + 1 : 1;
        this.matDialog.open(StoreDialogComponent,
            {data: {id, type: 'magento'}}
        ).afterClosed().subscribe(store => {
            if (store) {
                this.isLoadingResults = true;
                this.billingService.create(store).subscribe(() => this.ngOnInit());
            }
        });
    }

    openEditStoreDialog(store) {
        this.matDialog.open(StoreDialogComponent,
            {data: store}
        ).afterClosed().subscribe(editedStore => {
            if (editedStore) {
                this.isLoadingResults = true;
                this.billingService.update(editedStore).subscribe(() => this.ngOnInit());
            }
        });
    }

    blockStore(store) {
        this.isLoadingResults = true;
        const toBlock = {id: store.id, isActive: false};
        this.billingService.update(toBlock).subscribe(() => this.ngOnInit());
    }

}
