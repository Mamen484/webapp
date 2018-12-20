import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'sf-welcome-instructions',
    templateUrl: './welcome-instructions.component.html',
    styleUrls: ['./welcome-instructions.component.scss']
})
export class WelcomeInstructionsComponent {

    constructor(protected matDialogRef: MatDialogRef<WelcomeInstructionsComponent>) {
    }

    close() {
        this.matDialogRef.close();
    }

}
