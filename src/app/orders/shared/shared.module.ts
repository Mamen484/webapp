import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as GlobalSharedModule } from '../../shared/shared.module';
import { OrdersSubnavComponent } from './orders-subnav/orders-subnav.component';
import { ConfirmCancellationDialogComponent } from './confirm-cancellation-dialog/confirm-cancellation-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        GlobalSharedModule,
    ],
    declarations: [
        OrdersSubnavComponent,
        ConfirmCancellationDialogComponent
    ],
    exports: [
        GlobalSharedModule,
        OrdersSubnavComponent,
        ConfirmCancellationDialogComponent
    ],
    entryComponents: [
        ConfirmCancellationDialogComponent,
    ]
})
export class SharedModule {
}
