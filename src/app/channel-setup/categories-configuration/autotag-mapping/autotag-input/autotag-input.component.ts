import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FeedService } from '../../../../core/services/feed.service';
import { MappingCollection } from '../../../mapping-collection';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgControl,
    NgModel,
    ValidationErrors,
    Validator
} from '@angular/forms';
import { AutotagFormStateService } from '../autotag-form-state.service';
import { AutotagFormState } from '../autotag-form-state.enum';

@Component({
    selector: 'sf-autotag-input',
    templateUrl: './autotag-input.component.html',
    styleUrls: ['./autotag-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutotagInputComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AutotagInputComponent),
            multi: true,
        },
    ],
})
export class AutotagInputComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {

    @ViewChild(NgModel, {static: false}) ngModel: NgControl;

    @Input() value: string;
    @Input() label: string;
    @Output() changed = new EventEmitter<string>();
    mappingCollection: MappingCollection;
    suggestions: string[];
    lastEmittedValue = '';

    onChange: (value: string) => any;

    constructor(protected feedService: FeedService, protected stateService: AutotagFormStateService) {
    }

    ngOnInit() {
        this.feedService.fetchMappingCollection()
            .subscribe(mappingCollection => this.mappingCollection = mappingCollection);
    }

    ngOnChanges({value}: SimpleChanges) {
        if (value.currentValue !== value.previousValue) {
            this.lastEmittedValue = value.currentValue;
        }
    }

    createSuggestions() {
        if (!this.mappingCollection) {
            return;
        }
        this.suggestions = this.mappingCollection._embedded.mapping
            .filter(m => m.catalogField.toLowerCase().includes(this.value.toLowerCase()))
            .map(m => `{${m.catalogField}}`);
        if (this.value) {
            this.suggestions.unshift(`[${this.value}]`);
        }

    }

    notifyInputDirty() {
        this.stateService.changeState(AutotagFormState.dirty);
    }

    onBlur() {
        // use a static value if nothing was selected from suggestions
        if (this.value && this.value !== this.lastEmittedValue) {
            this.setAutotagValue('[' + this.value + ']');
        }
    }

    setAutotagValue(value: string) {
        this.changed.emit(value);
        this.notifyInputDirty();
        this.lastEmittedValue = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(): void {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this.ngModel.errors;
    }

    watchDeletion() {
        if (!this.value) {
            this.setAutotagValue('');
        }
    }


}
