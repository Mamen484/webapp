import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfuiExpandableComponent } from './expandable.component';
import { SfuiIconModule } from '../icon/icon.module';
import { SfuiExpandableGroupComponent } from './expandable-group/expandable-group.component';


@NgModule({
    declarations: [SfuiExpandableComponent, SfuiExpandableGroupComponent],
    imports: [
        CommonModule,
        SfuiIconModule
    ],
    exports: [SfuiExpandableComponent, SfuiExpandableGroupComponent],
})
export class SfuiExpandableModule {
}
