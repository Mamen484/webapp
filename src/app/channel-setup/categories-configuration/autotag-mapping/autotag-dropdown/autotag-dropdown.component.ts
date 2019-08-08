import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ChannelService } from '../../../../core/services/channel.service';
import { Autotag } from '../../../autotag';
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
import { Subscription } from 'rxjs';
import { AutotagInputComponent } from '../autotag-input/autotag-input.component';

@Component({
    selector: 'sf-autotag-dropdown',
    templateUrl: './autotag-dropdown.component.html',
    styleUrls: ['./autotag-dropdown.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutotagDropdownComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AutotagDropdownComponent),
            multi: true,
        },
    ],
})
export class AutotagDropdownComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

    @ViewChild(NgModel, {static: false}) ngModel: NgControl;
    @ViewChild(AutotagInputComponent, {static: false}) input: AutotagInputComponent;

    @Input() autotag: Autotag;
    @Output() loaded = new EventEmitter();
    options: string[];
    onChange: (value: string) => any;
    subscription: Subscription;

    inputLoaded = false;
    constraintLoaded = false;

    constructor(protected channelService: ChannelService) {
    }

    ngOnInit() {
        const attribute = this.autotag._embedded.attribute;
        this.subscription = this.channelService.fetchChannelConstraintCollection(attribute.taxonomyId, attribute.constraintGroupId)
            .subscribe(response => {
                this.options = response._embedded.constraint.map(constraint => constraint.label);
                this.constraintLoaded = true;
                this.markAsLoaded();
            })
    }

    markAsLoaded() {
        if (this.inputLoaded && this.constraintLoaded) {
            this.loaded.emit();
        }
    }

    notifyChange() {
        this.input.value = this.autotag.value;
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

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
