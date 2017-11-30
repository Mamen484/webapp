import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

const MARK_AS_COPIED_TIMEOUT = 3000; // ms

@Component({
    selector: 'sf-user-created-dialog',
    templateUrl: './user-created-dialog.component.html',
    styleUrls: ['./user-created-dialog.component.scss']
})
export class UserCreatedDialogComponent {

    loginCopied = false;
    passwordCopied = false;
    tokenCopied = false;

    constructor(@Inject(MAT_DIALOG_DATA) protected data,
                protected dialogRef: MatDialogRef<UserCreatedDialogComponent>) {
    }

    closeDialog() {
        this.dialogRef.close();
    }

    markAsCopied(control) {
        switch (control) {
            case 'login':
                this.loginCopied = true;
                Observable.interval(MARK_AS_COPIED_TIMEOUT).take(1).subscribe(() => this.loginCopied = false);
                break;

            case 'password':
                this.passwordCopied = true;
                Observable.interval(MARK_AS_COPIED_TIMEOUT).take(1).subscribe(() => this.passwordCopied = false);
                break;

            case 'token':
                this.tokenCopied = true;
                Observable.interval(MARK_AS_COPIED_TIMEOUT).take(1).subscribe(() => this.tokenCopied = false);
                break;
        }
    }

}
