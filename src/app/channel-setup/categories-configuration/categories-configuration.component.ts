import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { of, Subscription, zip } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, flatMap, map, tap } from 'rxjs/operators';
import { FeedService } from '../../core/services/feed.service';
import { Channel } from 'sfl-shared/entities';
import { FeedCategory } from '../../core/entities/feed-category';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryState } from '../category-state';
import { UnsavedDataDialogComponent } from './unsaved-data-dialog/unsaved-data-dialog.component';
import { Feed } from '../../core/entities/feed';
import { AppState } from '../../core/entities/app-state';
import { Store } from '@ngrx/store';
import { FeedCategoriesListComponent } from './feed-categories-list/feed-categories-list.component';
import { CategoryMappingComponent } from './category-mapping/category-mapping.component';
import { CategoryMappingService } from './category-mapping/category-mapping.service';
import { AutotagFormStateService } from './autotag-mapping/autotag-form-state.service';
import { AutotagFormState } from './autotag-mapping/autotag-form-state.enum';
import { LOAD_FULLSTORY } from '../../../trackers/fullstory';
import { environment } from '../../../environments/environment';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;
const CONFLICT_ERROR_CODE = 409;

@Component({
    templateUrl: './categories-configuration.component.html',
    styleUrls: ['./categories-configuration.component.scss']
})
export class CategoriesConfigurationComponent implements OnInit {

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

    leavePageDialogOpened = false;
    autotagFormState: AutotagFormState;

    protected subscription: Subscription;

    constructor(protected matDialog: MatDialog,
                protected feedService: FeedService,
                protected route: ActivatedRoute,
                protected appStore: Store<AppState>,
                protected categoryMappingService: CategoryMappingService,
                protected stateService: AutotagFormStateService,
                protected windowRef: SflWindowRefService,
                protected userService: SflUserService) {
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

    enableFullstory() {
        this.appStore.select('currentStore').pipe(
            flatMap(store => this.userService.fetchAggregatedInfo()
                .pipe(map(userInfo => ({store, userInfo}))))
        ).subscribe(
            ({store, userInfo}) => {
                LOAD_FULLSTORY(environment.FULLSTORY_ORG_ID);
                this.windowRef.nativeWindow.FS.identify(store.id, {
                    displayName: store.name,
                    email: userInfo.email,
                });
            }
        )
    }

    hasModifications() {
        return this.categoryMapping.searchChannelCategoryControl.dirty || this.autotagFormState === AutotagFormState.dirty;
    }

    ngOnInit() {
        this.enableFullstory();
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
        // prevent the dialog opened twice if the canDeactivate guard is called twice
        if (this.leavePageDialogOpened) {
            return of(true);
        }
        return this.matDialog.open(UnsavedDataDialogComponent).afterClosed().pipe(tap(
            // reset the flag if the user has declined leaving the page
            confirmed => this.leavePageDialogOpened = confirmed || false
        ));
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
