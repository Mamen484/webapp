import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as GlobalSharedModule } from '../../shared/shared.module';
import { ConfirmCancellationDialogComponent } from './confirm-cancellation-dialog/confirm-cancellation-dialog.component';
import { TagChipComponent } from './tag-chip/tag-chip.component';
import { OrdersLeftNavComponent } from './orders-left-nav/orders-left-nav.component';
import { SflSidebarModule } from 'sfl-shared/sidebar';

@NgModule({
    imports: [
        CommonModule,
        GlobalSharedModule,
        SflSidebarModule,
    ],
    declarations: [
        ConfirmCancellationDialogComponent,
        TagChipComponent,
        OrdersLeftNavComponent,
    ],
    exports: [
        GlobalSharedModule,
        ConfirmCancellationDialogComponent,
        TagChipComponent,
        OrdersLeftNavComponent,
    ],
    entryComponents: [
        ConfirmCancellationDialogComponent,
    ]
})
export class SharedModule {
}
