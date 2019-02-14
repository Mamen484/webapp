import { Component, Input, OnInit } from '@angular/core';

/**
 * A navigation bar right to sidebar.
 *
 * @example
 *
 * <sfl-left-navigation [title]="storeName">
 *     <mat-list-item class="has-top-margin">
 *             <a routerLink="/orders">Orders</a>
 *     </mat-list-item>
 *     <mat-list-item class="active auto-height">
 *         <div matLine>Settings</div>
 *         <mat-list matLine>
 *             <mat-list-item>
 *                 <a [class.active]="activeLink === 'test-order'" routerLink="orders/test-order">Test order</a>
 *             </mat-list-item>
 *             <mat-list-item>
 *                 <a [class.active]="activeLink === 'reporting'" routerLink="orders/reporting">Reporting</a>
 *             </mat-list-item>
 *             <mat-list-item>
 *                 <a [class.active]="activeLink === 'tags-management'" routerLink="/orders/tags-management">Tags management</a>
 *             </mat-list-item>
 *         </mat-list>
 *     </mat-list-item>
 * </sfl-left-navigation>
 */
@Component({
    selector: 'sfl-left-navigation',
    templateUrl: './sfl-left-navigation.component.html',
    styleUrls: ['./sfl-left-navigation.component.scss']
})
export class SflLeftNavigationComponent implements OnInit {

    @Input() title: string;

    constructor() {
    }

    ngOnInit() {
    }

}
