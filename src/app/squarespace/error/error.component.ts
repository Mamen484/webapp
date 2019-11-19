import { Component, OnInit } from '@angular/core';

@Component({
    template: `<sfl-error-page [showLink]="false">
        <div i18n>Failed to connect to Squarespace</div>
        <button mat-button i18n routerLink="/squarespace/authentify" color="accent">Try again</button>
    </sfl-error-page>`,
    styles: [],
})
export class ErrorComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
