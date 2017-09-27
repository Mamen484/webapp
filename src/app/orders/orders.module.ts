import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { SharedModule } from '../shared/shared.module';
import { OrdersFilterDialogComponent } from './orders-filter-dialog/orders-filter-dialog.component';
import { SearchOrdersComponent } from './search-orders/search-orders.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        OrdersRoutingModule
    ],
    declarations: [OrdersListComponent, OrdersFilterDialogComponent, SearchOrdersComponent],
    entryComponents: [OrdersFilterDialogComponent]
})
export class OrdersModule {
}
