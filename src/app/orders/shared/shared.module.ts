import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as GlobalSharedModule } from '../../shared/shared.module';
import { ConfirmCancellationDialogComponent } from './confirm-cancellation-dialog/confirm-cancellation-dialog.component';
import { TagChipComponent } from './tag-chip/tag-chip.component';
import { OrdersLeftNavComponent } from './orders-left-nav/orders-left-nav.component';
import { SflSidebarModule } from 'sfl-shared/sidebar';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ExpandableComponent } from './expandable/expandable.component';

@NgModule({
    imports: [
        CommonModule,
        GlobalSharedModule,
        SflSidebarModule,
        CdkAccordionModule,
    ],
    declarations: [
        ConfirmCancellationDialogComponent,
        TagChipComponent,
        OrdersLeftNavComponent,
        ExpandableComponent,
    ],
    exports: [
        GlobalSharedModule,
        ConfirmCancellationDialogComponent,
        TagChipComponent,
        OrdersLeftNavComponent,
        ExpandableComponent,
    ],
    entryComponents: [
        ConfirmCancellationDialogComponent,
    ]
})
export class SharedModule {
}
