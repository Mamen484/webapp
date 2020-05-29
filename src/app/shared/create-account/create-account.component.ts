import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AcceptTermsSnackbarComponent } from './accept-terms-snackbar/accept-terms-snackbar.component';
import { ErrorSnackbarConfig } from '../../core/entities/error-snackbar-config';

@Component({
    selector: 'sf-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

    @Input() hideForm = false;
    @Output() submitted = new EventEmitter<{ email: string, password: string }>();

    termsAccepted = false;

    emailControl = new FormControl('', [Validators.required, Validators.email]);
    passwordControl = new FormControl('', [Validators.required, Validators.minLength(7)]);

    constructor(protected snackbar: MatSnackBar) {
    }

    submit() {
        if (this.emailControl.hasError('required')
            || this.passwordControl.hasError('required')
            || this.emailControl.hasError('email')
            || this.passwordControl.hasError('minlength')
        ) {
            return;
        }

        if (!this.termsAccepted) {
            this.snackbar.openFromComponent(AcceptTermsSnackbarComponent, new ErrorSnackbarConfig());
            return;
        }

        this.submitted.emit({email: this.emailControl.value, password: this.passwordControl.value});
    }

}
