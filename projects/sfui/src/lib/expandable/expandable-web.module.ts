import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SfuiIconModule } from '../icon/icon.module';
import { SfuiExpandableGroupWebComponent } from './expandable-group/expandable-group-web.component';
import { SfuiExpandableWebComponent } from './expandable-web.component';


@NgModule({
    declarations: [SfuiExpandableWebComponent, SfuiExpandableGroupWebComponent],
    imports: [
        CommonModule,
        SfuiIconModule
    ],
    exports: [SfuiExpandableWebComponent, SfuiExpandableGroupWebComponent],
})
export class SfuiExpandableWebModule {
}
