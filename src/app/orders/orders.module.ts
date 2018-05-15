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
import { OrdersListMobileComponent } from './orders-list/orders-list-mobile/orders-list-mobile.component';
import { OrdersListDesktopComponent } from './orders-list/orders-list-desktop/orders-list-desktop.component';
import { OrdersTableSmallComponent } from './orders-table-small/orders-table-small.component';
import { ConfirmShippingDialogComponent } from './confirm-shipping-dialog/confirm-shipping-dialog.component';
import { OrderShippedSnackbarComponent } from './order-shipped-snackbar/order-shipped-snackbar.component';
import { CarrierDetailsDialogComponent } from './carrier-details-dialog/carrier-details-dialog.component';
import { OrderStatusComponent } from './order-status/order-status.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        OrdersRoutingModule
    ],
    declarations: [
        OrdersListComponent,
        OrdersFilterDialogComponent,
        SearchOrdersComponent,
        OrdersTableComponent,
        OrderDetailsComponent,
        LabelsDialogComponent,
        OrdersSubnavComponent,
        FilteringTabsComponent,
        OrdersListMobileComponent,
        OrdersListDesktopComponent,
        OrdersTableSmallComponent,
        ConfirmShippingDialogComponent,
        OrderShippedSnackbarComponent,
        CarrierDetailsDialogComponent,
        OrderStatusComponent,
    ],
    entryComponents: [
        OrdersFilterDialogComponent,
        LabelsDialogComponent,
        ConfirmShippingDialogComponent,
        OrderShippedSnackbarComponent,
        CarrierDetailsDialogComponent,
    ]
})
export class OrdersModule {
}
