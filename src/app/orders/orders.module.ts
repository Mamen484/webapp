import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { SharedModule } from '../shared/shared.module';
import { OrdersFilterDialogComponent } from './orders-filter-dialog/orders-filter-dialog.component';
import { SearchOrdersComponent } from './search-orders/search-orders.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { LabelsDialogComponent } from './labels-dialog/labels-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        OrdersRoutingModule
    ],
    declarations: [OrdersListComponent, OrdersFilterDialogComponent, SearchOrdersComponent, OrdersTableComponent, OrderDetailsComponent, LabelsDialogComponent],
    entryComponents: [OrdersFilterDialogComponent, LabelsDialogComponent]
})
export class OrdersModule {
}
