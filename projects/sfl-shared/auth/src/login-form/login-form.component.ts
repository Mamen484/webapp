import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

/**
 * A form to perform a login to a Shopping Feed application
 * @example
 *
 * <sfl-login-form [loadingNextPage]="loadingNextPage" (loginSubmitted)="login($event)">
 *  <!-- a tag with [sfl-login-title] indicates the form's title -->
 *  <div sfl-login-title i18n>Log in</div>
 *  <!-- the ng-content itself is the text displayed the under password field, some error can be displayed here -->
 *  <div class="mat-error">Sorry, we couldn't find the user with specified login or password</div>
 *  <!-- a tag with [sfl-login-links] indicates the help links from the login form -->
 *  <div sfl-login-links>
 *      <a class="below-form-link mat-body-1" i18n [routerLink]="['/reset-password']">Forgot the password?</a>
 *  </div>
 * </sfl-login-form>
 */

@Component({
    selector: 'sfl-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class SflLoginFormComponent {

    /** Show a progress bar on a form if true */
    @Input() loadingNextPage = false;

    /** The form-field appearance style, inhereted from mat-form-field. */
    @Input() appearance: MatFormFieldAppearance = 'standard';

    /**
     * Event emitted when not empty username and password submitted on a form
     */
    @Output() loginSubmitted = new EventEmitter<{ username: string, password: string }>();

    userNameControl = new FormControl('', [Validators.required]);
    passwordControl = new FormControl('', [Validators.required]);

    login() {
        if (this.userNameControl.hasError('required') || this.passwordControl.hasError('required')) {
            return;
        }

        this.loginSubmitted.emit({username: this.userNameControl.value, password: this.passwordControl.value});
    }

}
