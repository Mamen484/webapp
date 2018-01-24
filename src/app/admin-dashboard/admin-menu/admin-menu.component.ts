import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: 'sf-admin-menu',
    templateUrl: './admin-menu.component.html',
    styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {

    showSearch = false;
    constructor(protected breakpointObserver: BreakpointObserver) {
        this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Web])
            .subscribe(({matches}) => this.showSearch = matches);
    }
}
