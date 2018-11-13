import { Component } from '@angular/core';
import { SflLocalStorageService } from 'sfl-shared/services';
import { SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'sf-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {

    searchFocused = false;

    constructor(protected windowRef: SflWindowRefService,
                protected localStorage: SflLocalStorageService) {
    }

    logout() {
        this.localStorage.removeItem('Authorization');
        this.windowRef.nativeWindow.location.href = `${environment.APP_URL}/index/logout`;
    }
}
