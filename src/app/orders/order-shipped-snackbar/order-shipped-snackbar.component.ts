import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'sf-order-shipped-snackbar',
  templateUrl: './order-shipped-snackbar.component.html',
  styleUrls: ['./order-shipped-snackbar.component.scss']
})
export class OrderShippedSnackbarComponent implements OnInit {

  plural;
  action: 'ship' | 'acknowledge';

  constructor(@Inject(MAT_SNACK_BAR_DATA) {plural = false, action}: {plural: boolean, action: 'ship' | 'acknowledge'}) {
    this.plural = plural;
    this.action = action;
  }

  ngOnInit() {
  }

}
