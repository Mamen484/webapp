import { Component, OnInit } from '@angular/core';
import { PasswordRecoveryService } from '../../core/services/password-recovery.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'sf-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    name;
    password;
    passwordCheck;
    showSuccessMessage = false;

    passwordIncorrect = false;
    passwordsMatch = false;

    protected token;

    constructor(protected passwordRecoveryService: PasswordRecoveryService,
                protected route: ActivatedRoute) {
        this.route.params.subscribe(({token}) => this.token = token);
    }

    ngOnInit() {
    }

    reset() {
        this.passwordIncorrect = !this.password || this.password.length < 8 || !/\d+/.test(this.password) || !/[A-Z]+/.test(this.password);
        this.passwordsMatch = this.password === this.passwordCheck;

        if (this.passwordIncorrect || !this.passwordsMatch) {
            return;
        }

        this.passwordRecoveryService.resetPassword(this.token, this.name, this.password).subscribe(
            data => this.showSuccessMessage = true,
        );
    }

}
