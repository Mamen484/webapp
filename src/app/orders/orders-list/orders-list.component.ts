import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrdersFilterDialogComponent } from '../orders-filter-dialog/orders-filter-dialog.component';
import { MatDialog } from '@angular/material';
import { OrdersFilter } from '../../core/entities/orders-filter';

@Component({
  selector: 'sf-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  searchControl = new FormControl();
  processing = false;
  constructor(protected dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){
      let dialogRef = this.dialog.open(OrdersFilterDialogComponent);
      dialogRef.afterClosed().subscribe((data) => {
          if (!data) {
              return;
          }
      });
  }

}
