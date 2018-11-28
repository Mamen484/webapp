import { Component, OnInit } from '@angular/core';
import { BillingService } from '../billing.service';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { StoreDialogComponent } from '../store-dialog/store-dialog.component';
import { BillingStore } from '../billing-store';
import { StoreBlockDialogComponent } from '../store-block-dialog/store-block-dialog.component';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';

const SUCCESS_MESSAGE_DURATION = 5000;
const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

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

    searchControl = new FormControl();
    searchQuery = '';
    dataSubscription;

    constructor(protected billingService: BillingService,
                protected matDialog: MatDialog,
                protected snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.searchControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => !searchQuery || searchQuery.length >= MIN_QUERY_LENGTH),
        ).subscribe(searchQuery => {
            this.searchQuery = searchQuery;
            this.isLoadingResults = true;
            this.fetchData();
        });
        this.fetchData();
    }

    openCreateStoreDialog() {
        this.openStoreDialog(store => this.billingService.create(store));
    }

    openEditStoreDialog(store: BillingStore) {
        this.openStoreDialog((editedStore) => this.billingService.update(editedStore), store, false);
    }

    openStoreDialog(onSave: (store: BillingStore) => Observable<any>, store: BillingStore = null, nameEditable = true) {
        this.matDialog.open(StoreDialogComponent,
            {
                data: {
                    store,
                    onSave,
                    nameEditable
                }
            }
        ).afterClosed().subscribe(saved => {
            if (saved) {
                this.isLoadingResults = true;
                this.snackBar.open('The store has been saved successfully', '', {
                    duration: SUCCESS_MESSAGE_DURATION,
                });
                this.fetchData();
            }
        });
    }

    pageChanged(event: PageEvent) {
        if (event.pageIndex === event.previousPageIndex) {
            this.pageSize = event.pageSize;
            // we need to reset the current page to 1, because if we change the pageSize to a bigger value,
            // previously specified page might not exist
            this.currentPage = 1;
        } else {
            this.currentPage = event.pageIndex + 1;
        }
        this.isLoadingResults = true;
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
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
        this.dataSubscription = this.billingService.fetchStoreCollection({
            limit: this.pageSize,
            page: this.currentPage,
            search: this.searchQuery
        }).subscribe(storeList => {
            this.dataSource = storeList._embedded.store;
            this.isLoadingResults = false;
            this.resultsLength = storeList.total;
        });
    }

}
