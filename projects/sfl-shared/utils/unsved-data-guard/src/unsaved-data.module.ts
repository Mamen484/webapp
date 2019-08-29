import { NgModule } from '@angular/core';
import { UnsavedDataDialogComponent } from './unsaved-data-dialog.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatDialogModule],
    declarations: [UnsavedDataDialogComponent],
    entryComponents: [UnsavedDataDialogComponent],
    exports: [UnsavedDataDialogComponent],
})
export class UnsavedDataModule {
}
