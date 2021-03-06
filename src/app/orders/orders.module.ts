import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersFilterDialogComponent } from './orders-filter-dialog/orders-filter-dialog.component';
import { OrdersTableComponent } from './orders-list/orders-table/orders-table.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ConfirmShippingDialogComponent } from './confirm-shipping-dialog/confirm-shipping-dialog.component';
import { CarrierDetailsDialogComponent } from './carrier-details-dialog/carrier-details-dialog.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderStatusChangedSnackbarComponent } from './order-status-changed-snackbar/order-status-changed-snackbar.component';
import { SelectOrdersDialogComponent } from './select-orders-dialog/select-orders-dialog.component';
import { StatusButtonsComponent } from './status-buttons/status-buttons.component';
import { ActionButtonsComponent } from './order-details/action-buttons/action-buttons.component';
import { NewTagDialogComponent } from './new-tag-dialog/new-tag-dialog.component';
import { AssignTagsDialogComponent } from './assign-tags-dialog/assign-tags-dialog.component';
import { SummaryBlockComponent } from './order-details/summary-block/summary-block.component';
import { ItemsTableComponent } from './order-details/items-table/items-table.component';
import { AddressesComponent } from './order-details/addresses/addresses.component';
import { AddressFormComponent } from './order-details/address-form/address-form.component';
import { AddressSavedSnackbarComponent } from './order-details/address-saved-snackbar/address-saved-snackbar.component';
import { OrderErrorMessageComponent } from './order-details/order-error-message/order-error-message.component';
import { SkuModificationDialogComponent } from './order-details/sku-modification-dialog/sku-modification-dialog.component';
import { SkuSavedSnackbarComponent } from './order-details/sku-saved-snackbar/sku-saved-snackbar.component';
import { RefundDialogComponent } from './order-details/refund-dialog/refund-dialog.component';
import { SelectItemsDialogComponent } from './order-details/select-items-dialog/select-items-dialog.component';
import { SettingsModule } from './settings/settings.module';
import { SharedModule } from './shared/shared.module';
import { SflSidebarModule } from 'sfl-shared/sidebar';
import { OrderErrorsAlertComponent } from './orders-list/orders-table/order-errors-alert/order-errors-alert.component';
import { PaginatorIntlModule } from '../shared/paginator-intl/paginator-intl.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SflSidebarModule,
        OrdersRoutingModule,
        SettingsModule,
        PaginatorIntlModule,
    ],
    declarations: [
        AssignTagsDialogComponent,
        OrdersListComponent,
        OrdersFilterDialogComponent,
        OrdersTableComponent,
        OrderDetailsComponent,
        ConfirmShippingDialogComponent,
        CarrierDetailsDialogComponent,
        OrderStatusComponent,
        OrderStatusChangedSnackbarComponent,
        SelectOrdersDialogComponent,
        StatusButtonsComponent,
        ActionButtonsComponent,
        NewTagDialogComponent,
        SummaryBlockComponent,
        ItemsTableComponent,
        AddressesComponent,
        AddressFormComponent,
        AddressSavedSnackbarComponent,
        OrderErrorMessageComponent,
        SkuModificationDialogComponent,
        SkuSavedSnackbarComponent,
        RefundDialogComponent,
        SelectItemsDialogComponent,
        OrderErrorsAlertComponent,
    ],
    entryComponents: [
        AssignTagsDialogComponent,
        OrdersFilterDialogComponent,
        ConfirmShippingDialogComponent,
        CarrierDetailsDialogComponent,
        OrderStatusChangedSnackbarComponent,
        SelectOrdersDialogComponent,
        NewTagDialogComponent,
        AddressSavedSnackbarComponent,
        SkuModificationDialogComponent,
        SkuSavedSnackbarComponent,
        RefundDialogComponent,
        SelectItemsDialogComponent,
    ]
})
export class OrdersModule {
}
