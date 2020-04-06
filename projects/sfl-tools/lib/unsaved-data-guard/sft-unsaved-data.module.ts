import { NgModule } from '@angular/core';
import { UnsavedDataDialogComponent } from './unsaved-data-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatDialogModule],
    declarations: [UnsavedDataDialogComponent],
    entryComponents: [UnsavedDataDialogComponent],
    exports: [UnsavedDataDialogComponent],
})
export class SftUnsavedDataModule {
}
