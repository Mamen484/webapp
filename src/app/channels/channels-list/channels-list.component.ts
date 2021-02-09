import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';

@Component({
    selector: 'sf-channels-list',
    templateUrl: './channels-list.component.html',
    styleUrls: ['./channels-list.component.scss']
})
export class ChannelsListComponent implements OnInit {

    currentRoute;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.store.select('currentRoute').subscribe((route: any) => {
            this.currentRoute = route.pageName;
        })
    }

}
