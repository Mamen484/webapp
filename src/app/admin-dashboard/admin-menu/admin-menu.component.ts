import { Component } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { WindowRefService } from '../../core/services/window-ref.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'sf-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {

    constructor(protected windowRef: WindowRefService,
                protected localStorage: LocalStorageService) {
    }

    logout() {
        this.localStorage.removeItem('Authorization');
        this.windowRef.nativeWindow.location.href = `${environment.APP_URL}/index/logout`;
    }
}
