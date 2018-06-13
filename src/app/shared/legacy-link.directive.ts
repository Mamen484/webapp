import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LegacyLinkService } from '../core/services/legacy-link.service';

@Directive({
    selector: '[sfLegacyLink]'
})
export class LegacyLinkDirective implements OnChanges {

    @Input() storeId: number;
    @Input() path: string;

    constructor(protected elementRef: ElementRef,
                protected legacyLink: LegacyLinkService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setLinkHref();
    }

    protected setLinkHref() {
        let params = this.storeId ? {store: this.storeId} : {};
        (<HTMLLinkElement>this.elementRef.nativeElement).href = this.legacyLink.getLegacyLink(this.path, params);
    }

}
