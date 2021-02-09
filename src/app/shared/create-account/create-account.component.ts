import { Component, EventEmitter, Output } from '@angular/core';

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'sf-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

    @Output() submitted = new EventEmitter<{ email: string, password: string }>();

    termsAccepted = false;
    passwordIncorrect = false;
    passwordsMatch = false;
    emailValid = false;

    email;
    password;
    passwordCheck;

    constructor() {
    }

    submit() {
        const password = this.password;
        this.passwordIncorrect = !password || password.length < 8 || !/\d+/.test(password) || !/[A-Z]+/.test(password);
        this.passwordsMatch = this.password === this.passwordCheck;
        this.emailValid = emailPattern.test(this.email);

        if (this.passwordIncorrect || !this.termsAccepted || !this.passwordsMatch || !this.emailValid) {
            return;
        }

        this.submitted.emit({email: this.email, password: this.password});
    }

}
