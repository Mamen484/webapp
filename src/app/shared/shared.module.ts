import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdButtonModule,
    MdCardModule,
    MdIconModule, MdInputModule, MdListModule, MdMenuModule, MdSidenavModule, MdToolbarModule,
    MdTooltipModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { LargeNumberSuffixPipe } from './large-number-suffix.pipe';
import { SfCurrencyPipe } from './sf-currency.pipe';
import { SfNumberPipe } from './sf-number.pipe';

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
        MdCardModule,
        MdButtonModule,
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
        MdCardModule,
        MdButtonModule,

        LargeNumberSuffixPipe,
        SfCurrencyPipe,
        SfNumberPipe,
    ],
    declarations: [LargeNumberSuffixPipe, SfCurrencyPipe, SfNumberPipe]
})
export class SharedModule {
}
