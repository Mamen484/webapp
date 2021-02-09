import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfuiFormFieldComponent } from './form-field.component';


@NgModule({
    declarations: [SfuiFormFieldComponent],
    imports: [
        CommonModule
    ],
    exports: [SfuiFormFieldComponent]
})
export class SfuiFormFieldModule {
}
