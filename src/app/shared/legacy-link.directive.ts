import { Directive, ElementRef, Input } from '@angular/core';
import { LegacyLinkService } from '../core/services/legacy-link.service';

@Directive({
    selector: '[sfLegacyLink]'
})
export class LegacyLinkDirective {

    @Input()

    set path(value) {
        (<HTMLLinkElement>this.elementRef.nativeElement).href = this.legacyLink.getLegacyLink(value);
    }

    constructor(protected elementRef: ElementRef, protected legacyLink: LegacyLinkService) {
    }


}
