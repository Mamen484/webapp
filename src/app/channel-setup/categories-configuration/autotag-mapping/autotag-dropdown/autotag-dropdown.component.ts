import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
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
export class AutotagDropdownComponent implements OnInit, ControlValueAccessor, Validator {

    @ViewChild(NgModel, {static: false}) ngModel: NgControl;

    @Input() autotag: Autotag;
    options: string[];
    onChange: (value: string) => any;

    constructor(protected channelService: ChannelService) {
    }

    ngOnInit() {
        const attribute = this.autotag._embedded.attribute;
        this.channelService.fetchChannelConstraintCollection(attribute.taxonomyId, attribute.constraintGroupId)
            .subscribe(response => {
                this.options = response._embedded.constraint.map(constraint => constraint.label);
            })
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

}
