import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SET_ROUTE } from 'sfl-shared/reducers';

@Component({
    selector: 'sfc-current-route',
    template: '',
    styles: ['']
})
export class CurrentRouteComponent implements OnInit {

    @Input() menuName: string;
    @Input() pageName: string;

    constructor(private appStore: Store<{ currentRoute: { menuName: string; pageName: string } }>) {
    }


    ngOnInit(): void {
        this.appStore.dispatch({
            type: SET_ROUTE, route:
                {menuName: this.menuName, pageName: this.pageName}
        });
    }

}
