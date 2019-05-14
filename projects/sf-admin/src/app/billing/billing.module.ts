import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { StoreListComponent } from './store-list/store-list.component';
import { SfaSharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDialogComponent } from './store-list/store-dialog/store-dialog.component';
import { StoreBlockDialogComponent } from './store-list/store-block-dialog/store-block-dialog.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDialogComponent } from './group-list/group-dialog/group-dialog.component';
import { SearchBillingStoreDirective } from './search-billing-store/search-billing-store.directive';
import { AdminSidebarModule } from '../admin-sidebar/admin-sidebar.module';
import { InvoicingDetailsComponent } from './store-list/invoicing-details/invoicing-details.component';

@NgModule({
    imports: [
        BillingRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SfaSharedModule,
        AdminSidebarModule,
    ],
    providers: [],
    declarations: [
        GroupDialogComponent,
        GroupListComponent,
        StoreBlockDialogComponent,
        StoreDialogComponent,
        StoreListComponent,

        SearchBillingStoreDirective,

        InvoicingDetailsComponent,
    ],
    entryComponents: [
        GroupDialogComponent,
        StoreBlockDialogComponent,
        StoreDialogComponent,
    ],
})
export class BillingModule {
}
