import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    HostBinding,
    HostListener,
    Input,
    OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SFUI_OPTION_PARENT } from './option/option.component';
import { SfuiSelectRegister } from './select-register.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

let id = 0;

@Component({
    selector: 'sfui-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {provide: SFUI_OPTION_PARENT, useExisting: forwardRef(() => SfuiSelectComponent)},
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SfuiSelectComponent,
            multi: true
        }
    ],
})
export class SfuiSelectComponent implements AfterContentInit, ControlValueAccessor, OnInit {

    isDisabled = false;
    opened = false;
    width = 100;
    @Input() value: string;
    displayedValue: string;
    customId = id++;
    onChange;

    constructor(private elementRef: ElementRef<HTMLElement>,
                public changeDetectorRef: ChangeDetectorRef,
                private selectRegister: SfuiSelectRegister) {
    }

    set selectedOption({value, displayedValue}) {
        const emitChange = this.value !== value;
        this.value = value;
        this.displayedValue = displayedValue;
        if (emitChange) {
            this.onChange(this.value);
        }
    };

    @HostBinding('attr.sfui-id') get sfuiId() {
        return `sfui-select-${this.customId}`;
    }

    @HostBinding('class.sfui-focused') get focused() {
        return this.opened;
    };

    @HostBinding('class.sfui-disabled') get selectDisabled() {
        return this.isDisabled;
    };

    @Input() set disabled(value) {
        this.isDisabled = coerceBooleanProperty(value);
    };

    @HostListener('window:resize')
    onResize() {
        this.ngAfterContentInit();
    }

    ngAfterContentInit() {
        this.width = this.elementRef.nativeElement.querySelector('.sfui-select').getBoundingClientRect()?.width;
    }

    ngOnInit() {
        this.selectRegister.register(this.sfuiId, this);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
    }

    triggerOpened() {
        if (this.isDisabled) {
            this.opened = false;
            return;
        }
        this.opened = !this.opened;
    }

}
