import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../../core/services/window-ref.service';

@Component({
    selector: 'sf-server-error',
    templateUrl: './server-error.component.html',
    styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {

    constructor(protected windowRef: WindowRefService) {
    }

    ngOnInit() {
    }

    reloadPage() {
        this.windowRef.nativeWindow.location.reload();
    }

}
