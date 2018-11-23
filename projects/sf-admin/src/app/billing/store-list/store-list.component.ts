import { Component, OnInit } from '@angular/core';
import { BillingService } from '../billing.service';
import { MatDialog, PageEvent } from '@angular/material';
import { StoreDialogComponent } from '../store-dialog/store-dialog.component';
import { BillingStore } from '../billing-store';
import { StoreBlockDialogComponent } from '../store-block-dialog/store-block-dialog.component';


@Component({
    selector: 'sfa-store-list',
    templateUrl: './store-list.component.html',
    styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

    dataSource: BillingStore[];
    displayedColumns: string[] = ['name', 'price', 'commission', 'trialEndDate', 'closedAt', 'edit', 'block'];
    isLoadingResults = true;

    pageSizeOptions = [10, 15, 25, 50, 100];
    pageSize = 15;
    resultsLength = 0;
    currentPage = 1;

    constructor(protected billingService: BillingService, protected matDialog: MatDialog) {
    }

    ngOnInit() {
        this.fetchData();
    }

    openCreateStoreDialog() {
        this.matDialog.open(StoreDialogComponent, {data: {}})
            .afterClosed()
            .subscribe(store => {
                if (store) {
                    this.isLoadingResults = true;
                    this.billingService.create(store).subscribe(() => this.fetchData());
                }
            });
    }

    openEditStoreDialog(store) {
        this.matDialog.open(StoreDialogComponent,
            {data: store}
        ).afterClosed().subscribe(editedStore => {
            if (editedStore) {
                this.isLoadingResults = true;
                this.billingService.update(editedStore).subscribe(() => this.fetchData());
            }
        });
    }

    pageChanged(event: PageEvent) {
        if (event.pageIndex === event.previousPageIndex) {
            this.pageSize = event.pageSize;
        }
        this.isLoadingResults = true;
        this.currentPage = event.pageIndex + 1;
        this.fetchData()
    }

    blockStore(store) {
        this.matDialog.open(StoreBlockDialogComponent).afterClosed().subscribe(confirmed => {
            if (!confirmed) {
                return;
            }
            this.isLoadingResults = true;
            const toBlock = {id: store.id, isActive: false};
            this.billingService.update(toBlock).subscribe(() => this.ngOnInit());
        });
    }

    activateStore(store) {
        this.isLoadingResults = true;
        this.billingService.update({id: store.id, isActive: true})
            .subscribe(() => this.ngOnInit());
    }

    fetchData() {
        this.billingService.fetchStoreCollection({limit: this.pageSize, page: this.currentPage}).subscribe(storeList => {
            this.dataSource = storeList._embedded.store;
            this.isLoadingResults = false;
            this.resultsLength = storeList.total;
        });
    }

}
