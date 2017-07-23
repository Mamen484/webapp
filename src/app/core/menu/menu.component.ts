import { Component, Input, OnInit } from '@angular/core';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Store } from '../entities/store';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    @Input() userInfo: AggregatedUserInfo;
    currentStore: Store;

    constructor() {
    }

    ngOnInit() {
        this.currentStore = this.userInfo._embedded.store[0];
    }
}