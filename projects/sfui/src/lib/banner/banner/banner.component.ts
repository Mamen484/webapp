import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'sfui-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class SfuiBannerComponent implements OnInit {

    @Input() type: 'error' | 'info' | 'warning' | 'success' = 'info';

    constructor() {
    }

    ngOnInit(): void {
    }

}
