import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sf-settings-nav',
    templateUrl: './settings-nav.component.html',
    styleUrls: ['./settings-nav.component.scss']
})
export class SettingsNavComponent implements OnInit {

    @Input() activeLink: 'tags-management' | 'reporting' | 'test-order';

    constructor() {
    }

    ngOnInit() {
    }

}
