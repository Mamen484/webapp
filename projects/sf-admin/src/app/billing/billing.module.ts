import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreDialogComponent } from './store-dialog/store-dialog.component';
import { SfaSharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        BillingRoutingModule,
        FormsModule,
        SfaSharedModule,
    ],
    providers: [],
    declarations: [StoreListComponent, StoreDialogComponent],
    entryComponents: [StoreDialogComponent],
})
export class BillingModule {
}
