import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../core/entities/orders/order';
import { OrderAcknowledgment } from '../../../core/entities/orders/order-acknowledgment.enum';
import { OrderItem } from '../../../core/entities/orders/order-item';
import { OrderDetailsItem } from '../../../core/entities/orders/order-details-item';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { flatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';
import { SkuModificationDialogComponent } from '../sku-modification-dialog/sku-modification-dialog.component';
import { SkuSavedSnackbarComponent } from '../sku-saved-snackbar/sku-saved-snackbar.component';

@Component({
    selector: 'sf-items-table',
    templateUrl: './items-table.component.html',
    styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {

    @Input() order: Order;
    acknowledgment: OrderAcknowledgment;
    tableData;
    displayedColumns = ['sku', 'image', 'name', 'quantity', 'price'];

    constructor(protected matDialog: MatDialog,
                protected snackBar: MatSnackBar,
                protected ordersService: OrdersService,
                protected appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.initializeTableData();
    }

    updateItemReference(row: OrderDetailsItem) {
        this.matDialog.open(SkuModificationDialogComponent, {
            data: {sku: row.sku},
        })
            .afterClosed().subscribe(updatedSku => {
            if (updatedSku) {
                this.updateSku(row, updatedSku);
            }
        });
    }

    protected initializeTableData() {
        this.tableData = new MatTableDataSource(this.order.items.map((item: OrderItem) => {
            return <OrderDetailsItem>{
                sku: this.determineSku(item),
                name: item.name,
                quantity: item.quantity,
                date: this.order.createdAt,
                price: item.price,
                image: item.image,
                reference: item.reference,
            }
        }));
    }

    protected determineSku(item: OrderItem) {
        const aliases = this.order.itemsReferencesAliases;
        return aliases && aliases[item.reference] || item.reference;
    }

    protected showUpdateSkuError({message}) {
        this.snackBar.open(message, '', {
            panelClass: 'sf-snackbar-error',
            duration: 5000,
        })
    }

    protected updateSku(row: OrderDetailsItem, updatedSku: string) {
        return this.appStore.select('currentStore').pipe(
            flatMap(store => this.ordersService
                .updateItemsReferences(store.id, this.order.id, {[row.reference]: updatedSku})))
            .subscribe(() => {
                row.sku = updatedSku;
                this.snackBar.openFromComponent(SkuSavedSnackbarComponent, {
                    duration: 2000,
                })
            }, error => this.showUpdateSkuError(error));
    }

}
