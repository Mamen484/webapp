import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sfui-form-field',
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss'],
})
export class SfuiFormFieldComponent implements OnInit {

    @Input() type?: 'search';
    input: HTMLInputElement;
    hasFocus = false;

    constructor(private elementRef: ElementRef) {
    }

    @HostBinding('class.sfui-focused') get focused() {
        return this.hasFocus;
    };

    @HostBinding('class.sfui-search-field') get forSearch() {
        return this.type && this.type === 'search';
    };

    @HostBinding('class.sfui-disabled') get disabled() {
        return this.input?.disabled;
    };

    @HostBinding('class.sfui-has-value') get hasValue() {
        return this.input?.value;
    }

    markAsHavingValue() {
        this.elementRef.nativeElement.classList.add('sfui-has-value');
    }

    ngOnInit(): void {
        this.input = this.elementRef.nativeElement.querySelector('[sfui-input]');
        this.input.onblur = () => this.hasFocus = false;
        this.input.onfocus = () => this.hasFocus = true;
    }
}
