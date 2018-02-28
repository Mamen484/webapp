import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '../../core/services/store.service';

import { Router } from '@angular/router';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;


@Component({
    selector: 'sf-search-store',
    templateUrl: './search-store.component.html',
    styleUrls: ['./search-store.component.scss']
})
export class SearchStoreComponent implements OnInit, AfterViewInit {

    searchControl = new FormControl();
    searchResults: { name: string, id: number }[];
    showSearchResult = false;
    processing = false;
    searchSubscription;

    @HostListener('window:resize')
    setSearchResultsPosition() {
        let width = this.elementRef.nativeElement.querySelector('.toolbar-search-container').getBoundingClientRect().width;
        this.elementRef.nativeElement.querySelector('.search-results').style.width = `${width}px`;

        let leftPosition = this.elementRef.nativeElement.querySelector('.toolbar-search-container').getBoundingClientRect().left;
        this.elementRef.nativeElement.querySelector('.search-results').style.left = `${leftPosition}px`;


    }

    constructor(protected elementRef: ElementRef,
                protected storeService: StoreService,
                protected router: Router) {
    }

    ngOnInit() {
        this.searchControl.valueChanges
            .debounceTime(SEARCH_DEBOUNCE)
            .filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH)
            .do(() => this.processing = true)
            .do(searchQuery => this.handleNewSearch(searchQuery))
            .subscribe();
    }

    handleNewSearch(searchQuery) {
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
        this.searchSubscription = this.storeService.fetchAvailableStores(searchQuery)
            .subscribe(response => {
                this.searchResults = response._embedded.store;
                this.processing = false;
            });
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
        this.processing = true;
        this.router.navigate(['/home'], {queryParams: {store: storeId}});
    }
}
