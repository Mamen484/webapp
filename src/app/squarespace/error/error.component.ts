import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <sfl-image source="assets/images/login/squarespace-logo.png" width="188px"></sfl-image>
        <div i18n class="squarespace-header">Failed to connect to Squarespace</div>
        <div i18n>Don’t worry, these things happen. Please try again.</div>
        <button mat-raised-button i18n routerLink="/squarespace/authentify" color="accent">Try again</button>`,
    styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
