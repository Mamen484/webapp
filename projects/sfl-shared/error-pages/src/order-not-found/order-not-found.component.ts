import { Component } from '@angular/core';

/**
 * Critical server error.
 * To show it, import ErrorPagesModule, and redirect a user to /order-not-found route.
 */
@Component({
    selector: 'sfl-order-not-found',
    templateUrl: './order-not-found.component.html',
    styleUrls: ['./order-not-found.component.scss']
})
export class OrderNotFoundComponent {
}
