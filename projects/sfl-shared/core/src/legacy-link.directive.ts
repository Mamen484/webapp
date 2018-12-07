import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SflLegacyLinkService } from 'sfl-shared/services';

/**
 * Create a link to the legacy Shopping Feed app
 */
@Directive({
    selector: '[sflLegacyLink]'
})
export class SflLegacyLinkDirective implements OnChanges {

    /**
     * The store which needs to be opened in a legacy app.
     */
    @Input() storeId: number;
    /**
     * The path on a legacy app.
     */
    @Input() path: string;

    /**
     * To add an Authorization token set to true, otherwise false.
     */
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
