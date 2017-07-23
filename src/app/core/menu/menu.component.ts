import { Component, OnInit } from '@angular/core';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Store } from '../entities/store';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    userInfo: Observable<AggregatedUserInfo>;
    currentStore: Observable<Store>;

    constructor(protected _appStore: AppStore<AppState>) {
        this.userInfo = this._appStore.select('userInfo');
        this.currentStore = this._appStore.select('currentStore');

    }

    ngOnInit() {

    }
}
