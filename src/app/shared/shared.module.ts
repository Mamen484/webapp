import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdSidenavModule, MdToolbarModule,
    MdTooltipModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MdIconModule,
        MdToolbarModule,
        MdInputModule,
        MdMenuModule,
        MdSidenavModule,
        MdTooltipModule,
        MdListModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MdIconModule,
        MdToolbarModule,
        MdInputModule,
        MdMenuModule,
        MdSidenavModule,
        MdTooltipModule,
        MdListModule,
    ],
    declarations: []
})
export class SharedModule {
}
