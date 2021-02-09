import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuTabsComponent } from './menu-tabs.component';
import { FlexModule } from '@angular/flex-layout';
import { SflSharedModule } from 'sfl-shared';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [MenuTabsComponent],
    imports: [
        CommonModule,
        FlexModule,
        SflSharedModule,
        MatTabsModule,
    ],
    exports: [MenuTabsComponent],
})
export class MenuTabsModule {
}
