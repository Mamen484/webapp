import { Component, OnInit } from '@angular/core';
import { SflWindowRefService } from 'sfl-shared/src/lib/services';

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
