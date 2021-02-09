import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfuiLabelComponent } from './label.component';


@NgModule({
    declarations: [SfuiLabelComponent],
    imports: [
        CommonModule
    ],
    exports: [SfuiLabelComponent],
})
export class SfuiLabelModule {
}
