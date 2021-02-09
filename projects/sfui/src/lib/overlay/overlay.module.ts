import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfuiDropdownListComponent } from './dropdown-list/dropdown-list.component';
import { SfuiDropdownTriggerDirective } from './dropdown-list/dropdown-trigger.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [SfuiDropdownListComponent, SfuiDropdownTriggerDirective],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
    ],
    exports: [SfuiDropdownListComponent, SfuiDropdownTriggerDirective],
})
export class SfuiOverlayModule {
}
