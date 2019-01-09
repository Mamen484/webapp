import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { StoreListComponent } from './store-list/store-list.component';
import { SfaSharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDialogComponent } from './store-list/store-dialog/store-dialog.component';
import { StoreBlockDialogComponent } from './store-list/store-block-dialog/store-block-dialog.component';
import { GroupListComponent } from './group-list/group-list.component';

@NgModule({
    imports: [
        CommonModule,
        BillingRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SfaSharedModule,
    ],
    providers: [],
    declarations: [StoreListComponent, StoreDialogComponent, StoreBlockDialogComponent, GroupListComponent],
    entryComponents: [StoreDialogComponent, StoreBlockDialogComponent],
})
export class BillingModule {
}
