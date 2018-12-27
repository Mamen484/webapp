import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { Store } from 'sfl-shared/entities';

@Component({
    selector: 'sfa-search-store',
    templateUrl: './search-store.component.html',
    styleUrls: ['./search-store.component.scss'],
})
export class SearchStoreComponent {

    @Output() focus = new EventEmitter();
    @Output() blur = new EventEmitter();

    searchControl = new FormControl();
    searchResults: { name: string, id: number }[];

    processing = false;

    constructor(protected elementRef: ElementRef,
                protected windowRef: SflWindowRefService) {
    }

    clearSearch() {
        this.searchControl.reset();
        this.searchResults = undefined;

        return false;
    }

    displayFn(store: Store) {
        return store ? store.name : undefined;
    }

    selectStore(storeId) {
        this.processing = false;
        this.windowRef.nativeWindow.open(`${environment.WEBAPP_URL}?store=${storeId}`);
    }
}
