import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ChannelService, FullCountriesListService } from 'sfl-shared/services';
import { FormControl } from '@angular/forms';
import { Channel } from 'sfl-shared/entities';
import { debounce, filter, map, tap } from 'rxjs/operators';
import { of, Subscription, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';

const defaultPageLimit = 20;
export const searchDebounce = 300;
const minQueryLength = 2;
const displayedCountries = [
    'au',
    'at',
    'be',
    'br',
    'fr',
    'gb',
    'de',
    'es',
    'ca',
    'lt',
    'no',
    'pt',
    'bg',
    'hr',
    'fi',
    'lv',
    'sl',
    'us',
    'dk',
    'ru',
    'ee',
    'gr',
    'hu',
    'in',
    'ie',
    'mx',
    'nl',
    'ro',
    'jp',
    'cz',
    'it',
    'th',
    'pl',
    'tr',
    'se',
    'sh',
    'sk',
    'si',
];

@Component({
    selector: 'sf-all-channels',
    templateUrl: './all-channels.component.html',
    styleUrls: ['./all-channels.component.scss'],
})
export class AllChannelsComponent implements OnInit, OnDestroy {

    channels: Channel[] = [];
    hasNextPage = true;
    currentPage = 1;
    loading = true;

    // controls
    searchControl = new FormControl();
    type = '';
    category = '';
    country = '';
    filtersShown = true;
    countriesList = [];
    fullCountriesList = [];
    dataSubscription: Subscription;
    searchSubscription: Subscription;

    constructor(private channelService: ChannelService,
                private changeDetectorRef: ChangeDetectorRef,
                private countriesListService: FullCountriesListService,
                private appStore: Store<AppState>) {
    }

    clearSearch() {
        this.type = '';
        this.category = '';
        this.country = '';
        this.filtersShown = false;
        this.changeDetectorRef.detectChanges();
        this.filtersShown = true;
        this.searchControl.setValue('');
    }

    ngOnInit(): void {
        this.appStore.select('currentStore').subscribe(store => {
            this.country = store.country.toLowerCase();
            this.loadChannels();
        });
        this.searchSubscription = this.searchControl.valueChanges.pipe(
            debounce(searchQuery => searchQuery
                ? timer(searchDebounce).pipe(map(() => searchQuery))
                : of(searchQuery)
            ),
            filter(searchQuery => searchQuery.length >= minQueryLength || searchQuery === ''),
            tap(() => this.currentPage = 1)
        ).subscribe((searchQuery) => this.refreshChannels());
        this.countriesListService.getCountries().subscribe(countries => {
            this.fullCountriesList = countries
                .map(country => Object.assign({}, country, {code: country.code.toLowerCase()}));
            this.countriesList = this.fullCountriesList
                .filter(country => displayedCountries.includes(country.code));
        })

    }

    loadChannels() {
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
        this.loading = true;
        this.dataSubscription = this.channelService.listChannels(
            {
                page: this.currentPage,
                limit: defaultPageLimit,
                search: this.searchControl.value,
                country: this.country,
                segment: this.category,
                type: this.type,
            }
        ).subscribe(response => {
            this.channels = this.channels.concat(response._embedded.channel);
            this.loading = false;
            this.hasNextPage = response.page < response.pages;
            this.changeDetectorRef.detectChanges();
        })
    }

    refreshChannels() {
        this.channels = [];
        this.hasNextPage = true;
        this.currentPage = 1;
        this.loadChannels();
    }

    onScroll() {
        if (!this.hasNextPage || this.loading) {
            return;
        }
        this.currentPage += 1;
        this.loadChannels();
    }

    ngOnDestroy() {
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
    }

}
