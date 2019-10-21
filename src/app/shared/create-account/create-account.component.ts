import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'sf-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

    @Input() hideForm = false;
    @Output() submitted = new EventEmitter<{ email: string, password: string }>();

    emailControl = new FormControl('', [Validators.required, Validators.email]);
    passwordControl = new FormControl('', [Validators.required, Validators.minLength(7)]);

    submit() {
        if (this.emailControl.hasError('required')
            || this.passwordControl.hasError('required')
            || this.emailControl.hasError('email')
            || this.passwordControl.hasError('minlength')
        ) {
            return;
        }

        this.submitted.emit({email: this.emailControl.value, password: this.emailControl.value});
    }

}
