import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../../core/services/window-ref.service';

@Component({
    selector: 'sf-critical-error',
    templateUrl: './critical-error.component.html',
    styleUrls: ['./critical-error.component.scss']
})
export class CriticalErrorComponent implements OnInit {

    constructor(protected windowRef: WindowRefService) {
    }

    ngOnInit() {
    }

    reloadPage() {
        this.windowRef.nativeWindow.location.reload();
    }

}
