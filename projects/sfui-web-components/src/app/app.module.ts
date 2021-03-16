import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import {
    IconComponent,
    SfuiBannerComponent,
    SfuiBannerModule,
    SfuiCheckboxComponent,
    SfuiCheckboxModule,
    SfuiExpandableGroupWebComponent,
    SfuiExpandableWebComponent,
    SfuiExpandableWebModule,
    SfuiFormFieldComponent,
    SfuiFormFieldModule,
    SfuiIconModule,
    SfuiLabelComponent,
    SfuiLabelModule,
    SfuiOptionComponent,
    SfuiSelectComponent,
    SfuiSelectModule,
    SfuiToggleComponent,
    SfuiToggleModule,
} from 'sfui';
import { createCustomElement } from '@angular/elements';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        SfuiIconModule,
        SfuiBannerModule,
        SfuiCheckboxModule,
        SfuiFormFieldModule,
        SfuiSelectModule,
        SfuiLabelModule,
        SfuiToggleModule,
        SfuiExpandableWebModule,
    ],
    providers: [],
    exports: [],
})
export class AppModule implements DoBootstrap {

    constructor(protected injector: Injector) {

        this.registerElement(IconComponent, 'sfui-icon');
        this.registerElement(SfuiCheckboxComponent, 'sfui-checkbox');
        this.registerElement(SfuiBannerComponent, 'sfui-banner');
        this.registerElement(SfuiFormFieldComponent, 'sfui-form-field');
        this.registerElement(SfuiSelectComponent, 'sfui-select');
        this.registerElement(SfuiOptionComponent, 'sfui-option');
        this.registerElement(SfuiLabelComponent, 'sfui-label');
        this.registerElement(SfuiExpandableGroupWebComponent, 'sfui-expandable-group');
        this.registerElement(SfuiExpandableWebComponent, 'sfui-expandable');
        this.registerElement(SfuiToggleComponent, 'sfui-toggle');
    }

    ngDoBootstrap() {
    }

    registerElement(component, selector) {
        const element = createCustomElement(component, {injector: this.injector});
        customElements.define(selector, element);
    }
}
