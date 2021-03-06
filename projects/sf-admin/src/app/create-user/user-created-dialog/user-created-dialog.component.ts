import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

const MARK_AS_COPIED_TIMEOUT = 3000; // ms

@Component({
    selector: 'sfa-user-created-dialog',
    templateUrl: './user-created-dialog.component.html',
    styleUrls: ['./user-created-dialog.component.scss']
})
export class UserCreatedDialogComponent {

    loginCopied = false;
    passwordCopied = false;
    tokenCopied = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data) {
    }


    markAsCopied(control) {
        switch (control) {
            case 'login':
                this.loginCopied = true;
                interval(MARK_AS_COPIED_TIMEOUT).pipe(take(1)).subscribe(() => this.loginCopied = false);
                break;

            case 'password':
                this.passwordCopied = true;
                interval(MARK_AS_COPIED_TIMEOUT).pipe(take(1)).subscribe(() => this.passwordCopied = false);
                break;

            case 'token':
                this.tokenCopied = true;
                interval(MARK_AS_COPIED_TIMEOUT).pipe(take(1)).subscribe(() => this.tokenCopied = false);
                break;
        }
    }

}
