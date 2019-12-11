import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Subscription, zip} from 'rxjs';
import {FormControl} from '@angular/forms';
import {debounceTime, filter, tap} from 'rxjs/operators';
import {FeedService} from '../../core/services/feed.service';
import {Channel} from 'sfl-shared/entities';
import {FeedCategory} from '../../core/entities/feed-category';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {CategoryState} from '../category-state';
import {Feed} from '../../core/entities/feed';
import {FeedCategoriesListComponent} from './feed-categories-list/feed-categories-list.component';
import {CategoryMappingComponent} from './category-mapping/category-mapping.component';
import {CategoryMappingService} from './category-mapping/category-mapping.service';
import {AutotagFormStateService} from './autotag-mapping/autotag-form-state.service';
import {AutotagFormState} from './autotag-mapping/autotag-form-state.enum';
import {FullstoryLoaderService} from '../../core/services/fullstory-loader.service';
import {UnsavedDataDialogComponent, UnsavedDataInterface} from 'sfl-tools/src/lib/unsaved-data-guard';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;
const CONFLICT_ERROR_CODE = 409;

@Component({
    templateUrl: './categories-configuration.component.html',
    styleUrls: ['./categories-configuration.component.scss']
})
export class CategoriesConfigurationComponent implements OnInit, UnsavedDataInterface {

    @ViewChild(FeedCategoriesListComponent, {static: true}) feedCategoriesList: FeedCategoriesListComponent;
    @ViewChild(CategoryMappingComponent, {static: false}) categoryMapping: CategoryMappingComponent;

    channel: Channel;
    feed: Feed;

    /** client category search */
    searchClientCategoryControl = new FormControl();
    processingClientCategorySearch = false;
    categories: FeedCategory[];

    /** percentage of matched categories */
    percentage = 0;

    /** applied filter */
    categoryStateOptions = CategoryState;
    categoryStateFilter: CategoryState;

    autotagFormState: AutotagFormState;

    protected subscription: Subscription;

    constructor(protected matDialog: MatDialog,
                protected feedService: FeedService,
                protected route: ActivatedRoute,
                protected categoryMappingService: CategoryMappingService,
                protected stateService: AutotagFormStateService,
                protected fullstoryLoader: FullstoryLoaderService) {
    }


    @HostListener('window:beforeunload', ['$event'])
    handleBeforeUnload() {
        if (this.hasModifications()) {
            return confirm('Unsaved data can be lost, continue?');
        }
    }

    cancelFilter() {
        this.categoryStateFilter = CategoryState.NotSpecified;
        this.refreshCategoriesList();
    }

    hasModifications() {
        return this.categoryMapping.searchChannelCategoryControl.dirty || this.autotagFormState === AutotagFormState.dirty;
    }

    ngOnInit() {
        this.fullstoryLoader.load();
        this.route.data.subscribe(({data}) => {
            this.channel = data.channel;
            this.feed = data.feed;
            this.refreshCategoriesList();

            this.listenClientCategorySearch();
            this.listenCategoryMappingChanged();
        });
        this.stateService.getState().subscribe(state => this.autotagFormState = state);
    }

    onAutotagsLoaded() {
        this.categoryMapping.loading = false
    }

    openFilterDialog() {
        this.matDialog.open(FilterDialogComponent, {data: this.categoryStateFilter}).afterClosed().subscribe(state => {
            if (typeof state !== 'undefined') {
                this.categoryStateFilter = state;
                this.refreshCategoriesList();
            }
        });
    }


    showCloseDialog() {
        return this.matDialog.open(UnsavedDataDialogComponent).afterClosed();
    }

    refreshCategoriesList(silently = false) {
        if (!silently) {
            this.processingClientCategorySearch = true;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = this.feedService.fetchCategoryCollection(this.feed.id, {
            page: (this.feedCategoriesList.currentPage + 1).toString(),
            limit: this.feedCategoriesList.itemsPerPage,
            name: this.searchClientCategoryControl.value,
            state: this.categoryStateFilter,
        }).subscribe(categories => {
            this.categories = categories._embedded.category;
            this.feedCategoriesList.totalCategoriesNumber = categories.total;
            this.processingClientCategorySearch = false;
            this.refreshPercentage();
        }, error => {
            if (error.status === CONFLICT_ERROR_CODE) {
                this.feedCategoriesList.setPage(error.pages - 1);
                this.refreshCategoriesList();
            }
        });
    }

    protected listenCategoryMappingChanged() {
        this.categoryMappingService.getState().subscribe(channelCategory => {
            this.refreshCategoriesList(true);
        });
    }

    protected listenClientCategorySearch() {
        this.searchClientCategoryControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery.length >= MIN_QUERY_LENGTH || searchQuery.length === 0),
            tap(() => this.feedCategoriesList.setPage(0)),
        )
            .subscribe(() => this.refreshCategoriesList());
    }

    protected refreshPercentage() {
        zip(
            this.feedService.fetchCategoryCollection(this.feed.id, {state: CategoryState.Configured, limit: '1'}),
            this.feedService.fetchCategoryCollection(this.feed.id, {limit: '1'}),
        )
            .subscribe(([mapped, {total}]) => {
                this.percentage = total ? mapped.total / total : 0;
            })
    }

}
