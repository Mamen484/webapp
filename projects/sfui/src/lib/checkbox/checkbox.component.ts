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
 * Checkbox click action when user click on input element.
 * noop: Do not toggle checked or indeterminate.
 * check: Only toggle checked status, ignore indeterminate.
 * check-indeterminate: Toggle checked status, set indeterminate to false. Default behavior.
 * undefined: Same as `check-indeterminate`.
 */
export type SfuiCheckboxClickAction = 'noop' | 'check' | 'check-indeterminate' | undefined;

// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;

/**
 * Provider Expression that allows sfui-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
export const SFUI_CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SfuiCheckboxComponent),
    multi: true
};

/**
 * Represents the different states that require custom transitions between them.
 * @docs-private
 */
export const enum TransitionCheckState {
    /** The initial state of the component before any user interaction. */
    Init,
    /** The state representing the component when it's becoming checked. */
    Checked,
    /** The state representing the component when it's becoming unchecked. */
    Unchecked,
    /** The state representing the component when it's becoming indeterminate. */
    Indeterminate
}

/** Change event object emitted by SfuiCheckbox. */
export class SfuiCheckboxChange {
    /** The source MatCheckbox of the event. */
    source: SfuiCheckboxComponent;
    /** The new `checked` value of the checkbox. */
    checked: boolean;
}

@Component({
    selector: 'sfui-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [SFUI_CHECKBOX_CONTROL_VALUE_ACCESSOR],
    host: {
        'class': 'sfui-checkbox',
        '[id]': 'id',
        '[attr.tabindex]': 'null',
        '[class.sfui-checkbox-checked]': 'checked',
        '[class.sfui-checkbox-disabled]': 'disabled',
        '[class.sfui-checkbox-indeterminate]': 'indeterminate',
    }
})
export class SfuiCheckboxComponent implements ControlValueAccessor,
    AfterViewInit, OnDestroy {

    /** Name value will be applied to the input element if present */
    @Input() name: string | null = null;
    /** Event emitted when the checkbox's `checked` value changes. */
    @Output() readonly change: EventEmitter<SfuiCheckboxChange> =
        new EventEmitter<SfuiCheckboxChange>();
    /** Event emitted when the checkbox's `indeterminate` value changes. */
    @Output() readonly indeterminateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /** The value attribute of the native input element */
    @Input() value: string;
    /** The native `<input type="checkbox">` element */
    @ViewChild('input') _inputElement: ElementRef<HTMLInputElement>;
    private _uniqueId = `sfui-checkbox-${++nextUniqueId}`;
    /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
    @Input() id: string = this._uniqueId;
    private _options = {clickAction: 'check'};
    private _currentCheckState: TransitionCheckState = TransitionCheckState.Init;

    constructor(private elementRef: ElementRef<HTMLElement>,
                private _changeDetectorRef: ChangeDetectorRef,
                private _focusMonitor: FocusMonitor,) {
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

    /**
     * Whether the checkbox is checked.
     */
    @Input()
    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this.checked) {
            this._checked = newValue;
            this._changeDetectorRef.markForCheck();
        }
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

    private _indeterminate = false;

    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
     * set to false.
     */
    @Input()
    get indeterminate(): boolean {
        return this._indeterminate;
    }

    set indeterminate(value: boolean) {
        const changed = value != this._indeterminate;
        this._indeterminate = coerceBooleanProperty(value);

        if (changed) {
            if (this._indeterminate) {
                this._transitionCheckState(TransitionCheckState.Indeterminate);
            } else {
                this._transitionCheckState(
                    this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
            }
            this.indeterminateChange.emit(this._indeterminate);
        }

        this._syncIndeterminate(this._indeterminate);
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
        this.checked = !!value;
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
        const clickAction = this._options?.clickAction;

        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `checkbox` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();

        // If resetIndeterminate is false, and the current state is indeterminate, do nothing on click
        if (!this.disabled && clickAction !== 'noop') {
            // When user manually click on the checkbox, `indeterminate` is set to false.
            if (this.indeterminate && clickAction !== 'check') {

                Promise.resolve().then(() => {
                    this._indeterminate = false;
                    this.indeterminateChange.emit(this._indeterminate);
                });
            }

            this.toggle();
            this._transitionCheckState(
                this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);

            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this._emitChangeEvent();
        } else if (!this.disabled && clickAction === 'noop') {
            // Reset native input when clicked with noop. The native checkbox becomes checked after
            // click, reset it to be align with `checked` value of `sfui-checkbox`.
            this._inputElement.nativeElement.checked = this.checked;
            this._inputElement.nativeElement.indeterminate = this.indeterminate;
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
        const event = new SfuiCheckboxChange();
        event.source = this;
        event.checked = this.checked;

        this._controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    }

    private _transitionCheckState(newState: TransitionCheckState) {
        let oldState = this._currentCheckState;
        if (oldState === newState) {
            return;
        }
        this._currentCheckState = newState;
    }

    /**
     * Syncs the indeterminate value with the checkbox DOM node.
     *
     * We sync `indeterminate` directly on the DOM node, because in Ivy the check for whether a
     * property is supported on an element boils down to `if (propName in element)`. Domino's
     * HTMLInputElement doesn't have an `indeterminate` property so Ivy will warn during
     * server-side rendering.
     */
    private _syncIndeterminate(value: boolean) {
        const nativeCheckbox = this._inputElement;

        if (nativeCheckbox) {
            nativeCheckbox.nativeElement.indeterminate = value;
        }
    }

}
