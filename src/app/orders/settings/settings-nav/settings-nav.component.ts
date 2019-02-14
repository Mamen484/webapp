import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';

@Component({
    selector: 'sf-settings-nav',
    templateUrl: './settings-nav.component.html',
    styleUrls: ['./settings-nav.component.scss']
})
export class SettingsNavComponent implements OnInit {

    @Input() activeLink: 'tags-management' | 'reporting' | 'test-order';
    storeName: string;

    constructor(protected appStore: Store<AppState>) {
    }

    ngOnInit() {
        this.appStore.select('currentStore').subscribe(store => this.storeName = store.name);
    }

}
