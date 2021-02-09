import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';


/**
 * Toggle click action when user click on input element.
 * undefined = off
 */
export type SfuiToggleClickAction = 'off' | 'on' | undefined;

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;

/**
 * Provider Expression that allows sfui-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const SFUI_TOGGLE_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SfuiToggleComponent),
    multi: true
};

/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
export const enum SfuiToggleTransitionState {
    /** The initial state of the component before any user interaction. */
    Init,
    /** The state representing the component when it's becoming checked. */
    On,
    /** The state representing the component when it's becoming unchecked. */
    Off,
}

/** Change event object emitted by MatCheckbox. */
export class SfuiToggleChange {
    /** The source SfuiToggleComponent of the event. */
    source: SfuiToggleComponent;
    /** The new `checked` value of the checkbox. */
    checked: boolean;
}


@Component({
    selector: 'sfui-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.scss'],
    providers: [SFUI_TOGGLE_CONTROL_VALUE_ACCESSOR],
    host: {
        'class': 'sfui-toggle',
        '[id]': 'id',
        '[attr.tabindex]': 'null',
        '[class.sfui-toggle-on]': 'checked',
        '[class.sfui-toggle-off]': '!checked',
        '[class.sfui-toggle-disabled]': 'disabled',
    }
})
export class SfuiToggleComponent implements ControlValueAccessor,
    AfterViewInit, OnDestroy {

    @Input() name: string | null = null;
    @Output() readonly change: EventEmitter<SfuiToggleChange> =
        new EventEmitter<SfuiToggleChange>();
    @Input() value = 'off';
    @ViewChild('input') _inputElement: ElementRef<HTMLInputElement>;
    private _uniqueId = `sfui-toggle-${++nextUniqueId}`;
    @Input() id: string = this._uniqueId;

    constructor(private elementRef: ElementRef<HTMLElement>,
                private _changeDetectorRef: ChangeDetectorRef,
                private _focusMonitor: FocusMonitor) {
    }

    /** Returns the unique id for the visual hidden input. */
    get inputId(): string {
        return `${this.id || this._uniqueId}-input`;
    }

    private _required: boolean;

    /** Whether the checkbox is required. */
    @Input()
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }

    private _checked = false;

    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this.checked) {
            this._checked = newValue;
            this.value = this.checked ? 'on' : 'off';
            this._changeDetectorRef.markForCheck();
        }
    }

    get state() {
        return this.checked ? 'on' : 'off';
    }

    @Input()
    set state(value: 'on' | 'off') {
        this.checked = value === 'on';
    }

    private _disabled = false;

    /**
     * Whether the checkbox is disabled. This fully overrides the implementation provided by
     * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
     */
    @Input()
    get disabled() {
        return this._disabled;
    }

    set disabled(value: any) {
        const newValue = coerceBooleanProperty(value);

        if (newValue !== this.disabled) {
            this._disabled = newValue;
            this._changeDetectorRef.markForCheck();
        }
    }

    /**
     * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
     * @docs-private
     */
    _onTouched: () => any = () => {
    };

    ngAfterViewInit() {
        this._focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
            if (!focusOrigin) {
                // When a focused element becomes disabled, the browser *immediately* fires a blur event.
                // Angular does not expect events to be raised during change detection, so any state change
                // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
                // See https://github.com/angular/angular/issues/17793. To work around this, we defer
                // telling the form control it has been touched until the next tick.
                Promise.resolve().then(() => {
                    this._onTouched();
                    this._changeDetectorRef.markForCheck();
                });
            }
        });

    }

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this.elementRef);
    }

    // Implemented as part of ControlValueAccessor.
    writeValue(value: any) {
        this.checked = value === 'on';
    }

    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn: (value: any) => void) {
        this._controlValueAccessorChangeFn = fn;
    }

    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn: any) {
        this._onTouched = fn;
    }

    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    /** Toggles the `checked` state of the checkbox. */
    toggle(): void {
        this.checked = !this.checked;
    }

    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event
     */
    _onInputClick(event: Event) {
        event.stopPropagation();

        if (!this.disabled ) {
            this.toggle();
            this._emitChangeEvent();
        }
    }

    /** Focuses the checkbox. */
    focus(origin: FocusOrigin = 'keyboard', options?: FocusOptions): void {
        this._focusMonitor.focusVia(this._inputElement, origin, options);
    }

    _onInteractionEvent(event: Event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    }

    private _controlValueAccessorChangeFn: (value: any) => void = () => {
    };

    private _emitChangeEvent() {
        const event = new SfuiToggleChange();
        event.source = this;
        event.checked = this.checked;

        this._controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    }


}
