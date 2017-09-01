import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PasswordRecoveryService } from '../../core/services/password-recovery.service';
import { equalValuesValidator } from '../../shared/equal-values.validator';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sf-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    nameControl = new FormControl('', [Validators.required]);
    passwordControl = new FormControl('', [Validators.required]);
    passwordCheckControl = new FormControl('', [Validators.required, equalValuesValidator(this.passwordControl)]);
    showSuccessMessage = false;
    showError = false;

    protected token;

    constructor(protected passwordRecoveryService: PasswordRecoveryService,
                protected route: ActivatedRoute) {
        this.route.params.subscribe(({token}) => this.token = token);
    }

    ngOnInit() {
    }

    reset() {
        this.showError = false;
        if (this.nameControl.hasError('required')
            || this.passwordControl.hasError('required')
            || this.passwordCheckControl.hasError('required')
            || this.passwordCheckControl.hasError('equalValues')) {
            return;
        }
        this.passwordRecoveryService.resetPassword(this.token, this.nameControl.value, this.passwordControl.value).subscribe(
            data => this.showSuccessMessage = true,
            error => this.showError = true
        );
    }

}
