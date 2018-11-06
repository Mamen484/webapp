import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'sfl-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class SflLoginFormComponent implements OnInit {

    @Input() loadingNextPage = false;

    @Output() loginSubmitted = new EventEmitter();

    userNameControl = new FormControl('', [Validators.required]);
    passwordControl = new FormControl('', [Validators.required]);

    constructor() {
    }

    ngOnInit() {
    }

    login() {
        if (this.userNameControl.hasError('required') || this.passwordControl.hasError('required')) {
            return;
        }

        this.loginSubmitted.emit({username: this.userNameControl.value, password: this.passwordControl.value});
    }

}
