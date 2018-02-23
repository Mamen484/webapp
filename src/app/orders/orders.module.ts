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
import { OrdersSubnavComponent } from './orders-subnav/orders-subnav.component';
import { FilteringTabsComponent } from './filtering-tabs/filtering-tabs.component';
import { OrdersListMobileComponent } from './orders-list-mobile/orders-list-mobile.component';
import { OrdersListDesktopComponent } from './orders-list-desktop/orders-list-desktop.component';
import { OrdersTableSmallComponent } from './orders-table-small/orders-table-small.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        OrdersRoutingModule
    ],
    declarations: [OrdersListComponent, OrdersFilterDialogComponent, SearchOrdersComponent, OrdersTableComponent, OrderDetailsComponent, LabelsDialogComponent, OrdersSubnavComponent, FilteringTabsComponent, OrdersListMobileComponent, OrdersListDesktopComponent, OrdersTableSmallComponent],
    entryComponents: [OrdersFilterDialogComponent, LabelsDialogComponent]
})
export class OrdersModule {
}
