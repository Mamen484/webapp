import { AbstractControl, ValidatorFn } from '@angular/forms';

export function equalValuesValidator(secondControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return secondControl.value !== control.value ? {equalValues: true} : null;
    };
}