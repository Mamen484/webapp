import { AbstractControl, ValidatorFn } from '@angular/forms';
import { StoreValidationErrors } from 'sfl-shared/entities';

export function createUserErrorValidator(errorObject: StoreValidationErrors, path): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return errorObject.hasError(path) ? {'create-user-error': errorObject.getError(path)} : null;
    }
}
