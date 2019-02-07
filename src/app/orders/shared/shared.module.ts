import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as GlobalSharedModule } from '../../shared/shared.module';
import { ConfirmCancellationDialogComponent } from './confirm-cancellation-dialog/confirm-cancellation-dialog.component';
import { TagChipComponent } from './tag-chip/tag-chip.component';

@NgModule({
    imports: [
        CommonModule,
        GlobalSharedModule,
    ],
    declarations: [
        ConfirmCancellationDialogComponent,
        TagChipComponent,
    ],
    exports: [
        GlobalSharedModule,
        ConfirmCancellationDialogComponent,
        TagChipComponent,
    ],
    entryComponents: [
        ConfirmCancellationDialogComponent,
    ]
})
export class SharedModule {
}
