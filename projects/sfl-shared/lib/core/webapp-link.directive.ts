import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SflWebappLinkService } from 'sfl-shared/services';

/**
 * Create a link to the legacy Shopping Feed app
 */
@Directive({
    selector: '[sflWebappLink]'
})
export class SflWebappLinkDirective implements OnChanges {

    /**
     * The store which needs to be opened in a legacy app.
     */
    @Input() storeId: number;
    /**
     * The path on a legacy app.
     */
    @Input() path: string;
    /**
     * Hash string added to the end of the link
     */
    @Input() hash?: string;

    constructor(private elementRef: ElementRef,
                private webappLink: SflWebappLinkService,
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setLinkHref();
    }

    private setLinkHref() {
        let params = new HttpParams();
        if (this.storeId) {
            params = params.set('store', this.storeId.toString());
        }
        this.webappLink.setLink(this.elementRef, this.path, params, this.hash);
    }

}
