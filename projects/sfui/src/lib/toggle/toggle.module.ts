import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfuiToggleComponent } from './toggle.component';
import { SfuiIconModule } from '../icon/icon.module';


@NgModule({
    declarations: [SfuiToggleComponent],
    imports: [
        CommonModule,
        SfuiIconModule
    ]
})
export class SfuiToggleModule {
}
