import { Component, Input, OnInit } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'sfc-tracking-tools',
    template: `
        <ng-container sfcEnableGoogleAnalytics *ngIf="gaEnabled"></ng-container>
        <ng-container sfcEnableGoogleTagsManagement *ngIf="gtagEnabled"></ng-container>
        <ng-container sfcEnableZendeskChat [localeId]="zendeskChatLocaleId" *ngIf="zendeskEnabled"></ng-container>
        <ng-container sfEnableAutopilot *ngIf="autopilotEnabled"></ng-container>
        <ng-container sfEnableAppcues *ngIf="appcuesEnabled"></ng-container>
        <ng-container sfEnableFullstory *ngIf="fullstoryEnabled"></ng-container>
        <ng-container sfEnableSalesMachine *ngIf="salesMachineEnabled"></ng-container>
        <ng-container sfEnableFacebook *ngIf="facebookEnabled"></ng-container>
    `,
    styles: []
})
export class TrackingToolsComponent implements OnInit {

    gaEnabled = false;
    zendeskEnabled = false;
    autopilotEnabled = false;
    appcuesEnabled = false;
    fullstoryEnabled = false;
    salesMachineEnabled = false;
    facebookEnabled = false;
    gtagEnabled = false;

    @Input() zendeskChatLocaleId = 'en';

    constructor() {
    }

    @Input() set enableGoogleTagsManager(value: any) {
        this.gtagEnabled = coerceBooleanProperty(value);
    }

    @Input() set enableGoogleAnalytics(value: any) {
        this.gaEnabled = coerceBooleanProperty(value);
    }

    @Input() set enableZendeskChat(value) {
        this.zendeskEnabled = coerceBooleanProperty(value);
    }

    @Input() set enableAutopilot(value) {
        this.autopilotEnabled = coerceBooleanProperty(value);
    }

    @Input() set enableAppcues(value) {
        this.appcuesEnabled = coerceBooleanProperty(value);
    }

    @Input() set enableFullstory(value) {
        this.fullstoryEnabled = coerceBooleanProperty(value);
    }

    @Input() set enableSalesMachine(value) {
        this.salesMachineEnabled = coerceBooleanProperty(value);
    }

    @Input() set enableFacebook(value) {
        this.facebookEnabled = coerceBooleanProperty(value);
    }

    ngOnInit(): void {
    }

}
