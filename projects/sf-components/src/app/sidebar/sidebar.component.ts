import { Component, OnInit } from '@angular/core';
import { SidebarService as AbstractSidebarService } from 'sfl-tools/src/lib/sidebar';
import { SidebarService } from './sidebar.service';
import { Store as UserStore } from 'sfl-shared/entities';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';

@Component({
    selector: 'sfc-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    providers: [
        {provide: AbstractSidebarService, useClass: SidebarService}
    ]
})
export class SidebarComponent implements OnInit {

    loaded = false;
    currentStore: UserStore;
    webAppLink = environment.webAppLink;

    constructor(private appStore: Store<{ currentStore: UserStore }>) {

    }

    ngOnInit(): void {
        this.appStore.select('currentStore').subscribe(store => this.currentStore = store);
    }

}
