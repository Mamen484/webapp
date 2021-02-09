import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfuiSelectComponent } from './select.component';
import { SfuiOptionComponent } from './option/option.component';


@NgModule({
    declarations: [SfuiSelectComponent, SfuiOptionComponent],
    imports: [
        CommonModule,
    ],
    exports: [SfuiSelectComponent, SfuiOptionComponent],
})
export class SfuiSelectModule {
}
