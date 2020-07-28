import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sf-configuration-status',
    templateUrl: './configuration-status.component.html',
    styleUrls: ['./configuration-status.component.scss']
})
export class ConfigurationStatusComponent implements OnInit {

    @Input() imageLink: string;
    @Input() continueLink: string;
    @Input() percentage: number;

    constructor() {
    }

    ngOnInit(): void {
    }

}
