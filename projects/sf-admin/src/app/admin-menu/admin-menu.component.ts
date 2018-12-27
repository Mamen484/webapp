import { Component } from '@angular/core';
import { SflAuthService } from 'sfl-shared/services';
import { Router } from '@angular/router';

@Component({
    selector: 'sfa-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {

    searchFocused = false;

    constructor(protected authService: SflAuthService, protected router: Router) {
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
