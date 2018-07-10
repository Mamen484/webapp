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
import { CarrierDetailsDialogComponent } from './carrier-details-dialog/carrier-details-dialog.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderStatusChangedSnackbarComponent } from './order-status-changed-snackbar/order-status-changed-snackbar.component';
import { SelectOrdersDialogComponent } from './select-orders-dialog/select-orders-dialog.component';
import { StatusButtonsComponent } from './status-buttons/status-buttons.component';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { TagsManagementComponent } from './tags-management/tags-management.component';
import { NewTagDialogComponent } from './new-tag-dialog/new-tag-dialog.component';
import { AssignTagsDialogComponent } from './assign-tags-dialog/assign-tags-dialog.component';
import { SummaryBlockComponent } from './order-details/summary-block/summary-block.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        OrdersRoutingModule
    ],
    declarations: [
        AssignTagsDialogComponent,
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
        CarrierDetailsDialogComponent,
        OrderStatusComponent,
        OrderStatusChangedSnackbarComponent,
        SelectOrdersDialogComponent,
        StatusButtonsComponent,
        ActionButtonsComponent,
        TagsManagementComponent,
        NewTagDialogComponent,
        SummaryBlockComponent,
    ],
    entryComponents: [
        AssignTagsDialogComponent,
        OrdersFilterDialogComponent,
        LabelsDialogComponent,
        ConfirmShippingDialogComponent,
        CarrierDetailsDialogComponent,
        OrderStatusChangedSnackbarComponent,
        SelectOrdersDialogComponent,
        NewTagDialogComponent,
    ]
})
export class OrdersModule {
}
