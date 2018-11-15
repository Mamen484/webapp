import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SflLegacyLinkService } from 'sfl-shared/services';

/**
 * Create a link to the legacy Shopping Feed app
 */
@Directive({
    selector: '[sflLegacyLink]'
})
export class SflLegacyLinkDirective implements OnChanges {

    @Input() storeId: number;
    @Input() path: string;
    @Input() addAuthorization = true;

    constructor(protected elementRef: ElementRef,
                protected legacyLink: SflLegacyLinkService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setLinkHref();
    }

    protected setLinkHref() {
        let params = this.storeId ? {store: this.storeId} : {};
        (<HTMLLinkElement>this.elementRef.nativeElement).href = this.legacyLink.getLegacyLink(this.path, params, this.addAuthorization);
    }

}
