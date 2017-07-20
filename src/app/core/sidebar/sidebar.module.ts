import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar.component';
import {MdIconModule, MdMenuModule, MdSidenavModule, MdTooltipModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MdMenuModule,
        MdSidenavModule,
        MdTooltipModule,
        MdIconModule
    ],
    declarations: [SidebarComponent],
    exports: [SidebarComponent]
})
export class SidebarModule {
}
