import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SupportService } from '../core/services/support.service';

@Component({
    selector: 'sf-schedule-call-iframe',
    template: `
        <iframe [src]="calendlyUrl" class="scheduler" scrolling="yes"
                frameborder="0"></iframe>`,
    styles: ['.scheduler {width:100%; height: 100%;}']
})
export class ScheduleCallIframeComponent implements OnInit {

    calendlyUrl: SafeResourceUrl;

    constructor(public supportService: SupportService, public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.sanitizer.bypassSecurityTrustResourceUrl(this.getCalendlyUrl());
        this.calendlyUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getCalendlyUrl());
    }

    protected getCalendlyUrl() {
        switch (this.supportService.helpCenterLanguage) {
            case 'fr_fr':
                return 'https://calendly.com/shoppingfeedfr/feedangel-fr';
            case 'it':
                return 'https://calendly.com/shoppingfeedit/onboarding-it';
            case 'es':
                return 'https://calendly.com/shoppingfeedes/onboarding-es';
            default:
                return 'https://calendly.com/shoppingfeedus/onboarding-us';
        }
    }

}
