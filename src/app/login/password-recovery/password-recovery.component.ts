import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PasswordRecoveryService } from '../../core/services/password-recovery.service';

@Component({
    selector: 'sf-password-recovery',
    templateUrl: './password-recovery.component.html',
    styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

    emailControl = new FormControl('', [Validators.required]);
    showSuccessMessage = false;
    showError = false;

    constructor(protected passwordRecoveryService: PasswordRecoveryService) {
    }

    ngOnInit() {
    }

    reset() {
        this.showError = false;
        if (this.emailControl.hasError('required')) {
            return;
        }
        this.passwordRecoveryService.resetPassword(this.emailControl.value).subscribe(
            data => this.showSuccessMessage = true,
            error => this.showError = true
        );
    }

}
