import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { LegacyLinkService } from '../core/services/legacy-link.service';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';

// @TODO: write a test that ensures the logic of the directive and check it's performance

@Directive({
    selector: '[sfLegacyLink]'
})
export class LegacyLinkDirective implements OnDestroy {

    @Input()

    set path(value) {
        this._path = value;
        this.setLinkHref();
    }

    protected _path;
    protected subscription;
    protected currentStoreChanged = false;

    constructor(protected elementRef: ElementRef,
                protected legacyLink: LegacyLinkService,
                protected appStore: Store<AppState>) {
        // we need reset a legacy link href when the store changes
        this.subscription = this.appStore.select('currentStore').subscribe(store => {
            // skip for the first store initialization
            if (this.currentStoreChanged) {
                this.setLinkHref();
            } else {
                this.currentStoreChanged = true;
            }
        });
    }

    protected setLinkHref() {
        (<HTMLLinkElement>this.elementRef.nativeElement).href = this.legacyLink.getLegacyLink(this._path);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
