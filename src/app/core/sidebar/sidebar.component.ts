import { Component, Input } from '@angular/core';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { Store } from '../entities/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'sf-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    @Input() opened = true;
    currentStore: Observable<Store>;

    constructor(protected _appStore: AppStore<AppState>) {
        this.currentStore = this._appStore.select('currentStore');
    }

    hasChannelsPermissions() {
        return this.currentStore.map(({permission}) => permission)
            .map(({ads, affiliation, marketplaces, retargeting, shopbots, solomo}) =>
                ads || affiliation || marketplaces || retargeting || shopbots || solomo);
    }

}
