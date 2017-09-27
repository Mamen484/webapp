import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrdersFilterDialogComponent } from '../orders-filter-dialog/orders-filter-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'sf-search-orders',
    templateUrl: './search-orders.component.html',
    styleUrls: ['./search-orders.component.scss']
})
export class SearchOrdersComponent implements OnInit {

    searchControl = new FormControl();
    processing = false;

    constructor(protected dialog: MatDialog) {
    }

    ngOnInit() {
    }

    openDialog() {
        let dialogRef = this.dialog.open(OrdersFilterDialogComponent);
        dialogRef.afterClosed().subscribe((data) => {
            if (!data) {
                return;
            }
        });
    }

}
