import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../core/entities/orders/order';
import { OrderItem } from '../../core/entities/orders/order-item';
import { cloneDeep } from 'lodash';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { OrderDetailsItem } from '../../core/entities/orders/order-details-item';
import { CarrierDetailsDialogComponent } from '../carrier-details-dialog/carrier-details-dialog.component';
import { CarrierInfo } from '../../core/entities/carrier-info';
import { OrderShippedSnackbarComponent } from '../order-shipped-snackbar/order-shipped-snackbar.component';

@Component({
    selector: 'sf-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

    displayedColumns = ['sku', 'name', 'quantity', 'date', 'price'];
    data: MatTableDataSource<OrderDetailsItem>;
    order: Order;

    constructor(protected route: ActivatedRoute,
                protected matDialog: MatDialog,
                protected snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.route.data.subscribe(({order}: { order: Order }) => {
            this.order = cloneDeep(order);
            this.data = new MatTableDataSource(order.items.map((item: OrderItem) => {
                return <OrderDetailsItem>{
                    sku: item.reference,
                    name: item.name,
                    quantity: item.quantity,
                    date: order.createdAt,
                    price: item.price
                }
            }));
        });
    }

    shipOrder() {
        this.matDialog.open(CarrierDetailsDialogComponent)
            .afterClosed().subscribe((data?: CarrierInfo) => {
            if (data) {
                this.snackBar.openFromComponent(OrderShippedSnackbarComponent, {
                    duration: 2000
                });
            }
        })
    }
}
