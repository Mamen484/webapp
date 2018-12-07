import { Component, OnInit } from '@angular/core';
import { SflWindowRefService } from 'sfl-shared/services';

/**
 * Critical server error.
 * To show it, import ErrorPagesModule, and redirect a user to /critical-error route.
 */
@Component({
    selector: 'sfl-critical-error',
    templateUrl: './critical-error.component.html',
    styleUrls: ['./critical-error.component.scss']
})
export class CriticalErrorComponent implements OnInit {

    constructor(protected windowRef: SflWindowRefService) {
    }

    ngOnInit() {
    }

    reloadPage() {
        this.windowRef.nativeWindow.location.reload();
    }

}
