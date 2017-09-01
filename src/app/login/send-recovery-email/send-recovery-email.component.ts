import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PasswordRecoveryService } from '../../core/services/password-recovery.service';

@Component({
    templateUrl: './send-recovery-email.component.html',
    styleUrls: ['./send-recovery-email.component.scss']
})
export class SendRecoveryEmailComponent implements OnInit {

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
        this.passwordRecoveryService.sendRecoveryEmail(this.emailControl.value).subscribe(
            data => this.showSuccessMessage = true,
            error => this.showError = true
        );
    }

}
