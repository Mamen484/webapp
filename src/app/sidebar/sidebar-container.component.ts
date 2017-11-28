import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sf-sidebar-container',
    templateUrl: './sidebar-container.component.html',
    styleUrls: ['./sidebar-container.component.scss']
})
export class SidebarContainerComponent implements OnInit {

    opened = true;

    constructor() {
    }

    ngOnInit() {
    }

}
