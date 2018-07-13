import { Component, Input, OnInit } from '@angular/core';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';

/**
 * Convert order status to readable and translatable using i18n string.
 */
@Component({
  selector: 'sf-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  @Input() status: OrderStatus;
  orderStatus = OrderStatus;

  constructor() { }

  ngOnInit() {
  }

}
