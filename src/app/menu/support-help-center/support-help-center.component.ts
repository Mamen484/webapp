import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { SearchArticlesEntry } from '../../core/entities/search-articles-entry';
import { FormControl } from '@angular/forms';
import { SupportService } from '../../core/services/support.service';
import { environment } from '../../../environments/environment';
import { LocaleIdService } from '../../core/services/locale-id.service';
import { HelpCenterLanguage } from '../../core/entities/help-center-language';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

@Component({
    selector: 'sf-support-help-center',
    templateUrl: './support-help-center.component.html',
    styleUrls: ['./support-help-center.component.scss']
})
export class SupportHelpCenterComponent implements OnInit, AfterViewInit {

    supportUrl = environment.SUPPORT_URL;
    searchControl = new FormControl();
    searchResults: SearchArticlesEntry[];
    showSearchResult = false;
    processing = false;
    helpCenterLanguage: HelpCenterLanguage;

    @HostListener('window:resize')
    setSearchResultsPosition() {
        let width = this.elementRef.nativeElement.querySelector('.toolbar-search-container').getBoundingClientRect().width;
        this.elementRef.nativeElement.querySelector('.search-results').style.width = `${width}px`;

    }

    constructor(protected elementRef: ElementRef,
                protected supportService: SupportService,
                protected localeIdService: LocaleIdService) {
    }

    ngOnInit() {
        this.helpCenterLanguage = this.localeIdService.getHelpCenterLanguage();
        this.searchControl.valueChanges
            .debounceTime(SEARCH_DEBOUNCE)
            .filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH)
            .do(() => this.processing = true)
            .flatMap(searchQuery => this.supportService.searchArticles(searchQuery))
            .subscribe(response => {
                this.searchResults = [];
                response._embedded.entries.forEach(entry => {
                    if (entry.body_chat.trim() && this.searchResults.length < 3) {
                        entry.body_chat = entry.body_chat.slice(0, entry.body_chat.indexOf('...') + 3);
                        this.searchResults.push(entry);
                    }
                });
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

}
