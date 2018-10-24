import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
    selector: '[sfHasServerError]',
    providers: [{ provide: NG_VALIDATORS, useExisting: HasServerErrorDirective, multi: true }]
})
export class HasServerErrorDirective implements Validator {

    @Input() validationError: string;

    validate(control: AbstractControl) {
        return this.validationError ? {'serverError': {value: this.validationError}} : null;
    }

}
