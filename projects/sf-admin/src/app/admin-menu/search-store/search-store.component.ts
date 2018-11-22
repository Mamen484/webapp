import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'sfa-search-store',
    templateUrl: './search-store.component.html',
    styleUrls: ['./search-store.component.scss'],
})
export class SearchStoreComponent implements OnInit, AfterViewInit {

    @Output() focus = new EventEmitter();
    @Output() blur = new EventEmitter();

    searchControl = new FormControl();
    searchResults: { name: string, id: number }[];
    protected _showSearchResult = false;
    get showSearchResult() {
        return this._showSearchResult;
    }

    set showSearchResult(value) {
        if (value === this._showSearchResult) {
            return;
        }
        this._showSearchResult = value;
        if (value) {
            this.focus.emit();
        } else {
            this.blur.emit();
        }
        setTimeout(() => {
            // schedule changing lookup position and width after container changes size
            this.setSearchResultsPosition();
        });
    }

    processing = false;

    @HostListener('window:resize')
    setSearchResultsPosition() {
        let width = this.elementRef.nativeElement.querySelector('.toolbar-search-container').getBoundingClientRect().width;
        this.elementRef.nativeElement.querySelector('.search-results').style.width = `${width}px`;

        let leftPosition = this.elementRef.nativeElement.querySelector('.toolbar-search-container').getBoundingClientRect().left;
        this.elementRef.nativeElement.querySelector('.search-results').style.left = `${leftPosition}px`;
    }

    constructor(protected elementRef: ElementRef,
                protected windowRef: SflWindowRefService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.setSearchResultsPosition()
    }

    clearSearch() {

        this.showSearchResult = false;
        this.searchControl.reset();
        this.searchResults = undefined;

        return false;
    }

    selectStore(storeId) {
        this.processing = false;
        this.windowRef.nativeWindow.open(`${environment.WEBAPP_URL}?store=${storeId}`);
    }
}
