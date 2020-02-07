import { Component } from '@angular/core';

/**
 * Critical server error.
 * To show it, import ErrorPagesModule, and redirect a user to /store-not-found route.
 */
@Component({
    selector: 'sfl-store-not-found',
    templateUrl: './store-not-found.component.html',
    styleUrls: ['./store-not-found.component.scss']
})
export class StoreNotFoundComponent {
}
