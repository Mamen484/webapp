import { Component, Input } from '@angular/core';
import { SflLocalStorageService } from 'sfl-shared/services';
import { Router } from '@angular/router';

@Component({
    selector: 'sfa-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
    @Input() showSubnavigation = false;
    constructor(protected router: Router,
                protected localStorage: SflLocalStorageService) {
    }

    logout() {
        this.localStorage.removeItem('Authorization');
        this.router.navigate(['/login']);
    }
}
