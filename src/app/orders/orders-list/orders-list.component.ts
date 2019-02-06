import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sf-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}
