import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../../core/entities/orders/order';
import { OrderAcknowledgment } from '../../../core/entities/orders/order-acknowledgment.enum';
import { OrderItem } from '../../../core/entities/orders/order-item';
import { OrderDetailsItem } from '../../../core/entities/orders/order-details-item';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { flatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';
import { SkuModificationDialogComponent } from '../sku-modification-dialog/sku-modification-dialog.component';
import { SkuSavedSnackbarComponent } from '../sku-saved-snackbar/sku-saved-snackbar.component';
import { SelectionModel } from '@angular/cdk/collections';
import { OrderStatus } from '../../../core/entities/orders/order-status.enum';
import { ChannelMap } from '../../../core/entities/channel-map.enum';

@Component({
    selector: 'sf-items-table',
    templateUrl: './items-table.component.html',
    styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {

    @Input() order: Order;
    @Input() mode: 'normal' | 'refund' = 'normal';
    @Output() selectionChanged = new EventEmitter();
    acknowledgment: OrderAcknowledgment;
    tableData: MatTableDataSource<OrderDetailsItem>;
    displayedColumns = ['refund-specific', 'sku', 'image', 'name', 'quantity', 'tax-amount', 'price'];
    footerColumns = ['left-gap', 'total-captions', 'total-values'];
    selection = new SelectionModel<OrderDetailsItem>(true, []);
    refundShipping = false;
    selectedQuantity = {};
    statuses = OrderStatus;
    allowEditQuantity = true;

    taxTotalAmount: number;

    constructor(protected matDialog: MatDialog,
                protected snackBar: MatSnackBar,
                protected ordersService: OrdersService,
                protected appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.initializeTableData();
        this.tableData.data.map(item => this.selectedQuantity[item.reference] = item.quantity);
        this.selection.changed.subscribe(() => this.selectionChanged.emit());
        this.checkIfQuantityEditable();
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
                status: item.status,
                taxAmount: item.taxAmount || 0,
            }
        }));

        this.taxTotalAmount = this.order.items.reduce((sum: number, item: OrderItem) => sum + item.taxAmount, 0);
    }

    protected checkIfQuantityEditable() {
        this.allowEditQuantity = this.order._embedded.channel.id === ChannelMap.laredoute;
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
        const itemsReferencesAliases = Object.assign({}, this.order.itemsReferencesAliases, {[row.reference]: updatedSku});
        return this.appStore.select('currentStore').pipe(
            flatMap(store => this.ordersService
                .updateItemsReferences(store.id, this.order.id, itemsReferencesAliases)))
            .subscribe(() => {
                row.sku = updatedSku;
                this.snackBar.openFromComponent(SkuSavedSnackbarComponent, {
                    duration: 2000,
                })
            }, error => this.showUpdateSkuError(error));
    }

}
