import { Component, OnInit } from '@angular/core';
import { TableDataSource } from '../../core/entities/table-data-source';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sf-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

    displayedColumns = ['sku', 'name', 'quantity', 'date', 'price'];

  data = new TableDataSource(Observable.of([
      {sku: '4123412341-123123512341', name: 'Vest', quantity: 1, date: '12/07/2016 14:26', price: 125},
      {sku: '4123412341-123123512341', name: 'Vest', quantity: 1, date: '12/07/2016 14:26', price: 125},
      {sku: '4123412341-123123512341', name: 'Vest', quantity: 1, date: '12/07/2016 14:26', price: 125},
      {sku: '4123412341-123123512341', name: 'Vest', quantity: 1, date: '12/07/2016 14:26', price: 125},
      {sku: '4123412341-123123512341', name: 'Vest', quantity: 1, date: '12/07/2016 14:26', price: 125},
      {sku: '4123412341-123123512341', name: 'Vest', quantity: 1, date: '12/07/2016 14:26', price: 125},
      {sku: '4123412341-123123512341', name: 'Vest', quantity: 1, date: '12/07/2016 14:26', price: 125},
      {sku: '4123412341-123123512341', name: 'Vest', quantity: 1, date: '12/07/2016 14:26', price: 125},
  ]));

  constructor() { }

  ngOnInit() {
  }

}
