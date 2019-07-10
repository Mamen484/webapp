import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BillingStore } from './billing-store';
import { Observable } from 'rxjs';
import { StoreBlockDialogComponent } from './store-block-dialog/store-block-dialog.component';
import { BillingStoreService } from './billing-store.service';
import { StoreDialogComponent } from './store-dialog/store-dialog.component';
import { map } from 'rxjs/operators';
import { TableOperations } from 'sfl-shared/utils/table-operations';
import { ActivatedRoute } from '@angular/router';

const SNACKBAR_MESSAGE_DURATION = 5000;


@Component({
    selector: 'sfa-store-list',
    templateUrl: './store-list.component.html',
    styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent extends TableOperations<BillingStore> implements OnInit {

    displayedColumns: string[] = ['name', 'price', 'commission', 'trialEndDate', 'closedAt', 'groupName', 'invoicing', 'edit', 'block'];

    constructor(protected billingStoreService: BillingStoreService,
                protected matDialog: MatDialog,
                protected snackBar: MatSnackBar,
                protected route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.route.queryParams.subscribe(params => {
            if (params.store) {
                this.searchQuery = params.store;
            }
        });
    }

    openCreateStoreDialog() {
        this.openStoreDialog(store => this.billingStoreService.create(store));
    }

    openEditStoreDialog(store: BillingStore) {
        this.openStoreDialog((editedStore) => this.billingStoreService.update(editedStore), store, false);
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
                    duration: SNACKBAR_MESSAGE_DURATION,
                });
                this.fetchData();
            }
        });
    }

    blockStore(store) {
        this.matDialog.open(StoreBlockDialogComponent).afterClosed().subscribe(confirmed => {
            if (!confirmed) {
                return;
            }
            this.isLoadingResults = true;
            const toBlock = {id: store.id, isActive: false};
            this.billingStoreService.update(toBlock).subscribe(() => {
                this.snackBar.open('The store has been blocked', '', {
                    duration: SNACKBAR_MESSAGE_DURATION,
                });
                this.fetchData();
            });
        });
    }

    activateStore(store) {
        this.isLoadingResults = true;
        this.billingStoreService.update({id: store.id, isActive: true})
            .subscribe(() => {
                this.snackBar.open('The store has been unblocked', '', {
                    duration: SNACKBAR_MESSAGE_DURATION,
                });
                this.fetchData();
            });
    }

    protected fetchCollection(params: { limit: number; page: number; search: string }) {
        return this.billingStoreService.fetchStoreCollection(params)
            .pipe(map(response => ({total: response.total, dataList: response._embedded.store})));
    }

}
