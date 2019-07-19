import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { FeedService } from '../../core/services/feed.service';
import { Channel } from 'sfl-shared/entities';
import { FeedCategory } from '../../core/entities/feed-category';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryMapping } from '../category-mapping';
import { UnsavedDataDialogComponent } from './unsaved-data-dialog/unsaved-data-dialog.component';
import { Feed } from '../../core/entities/feed';
import { AppState } from '../../core/entities/app-state';
import { Store } from '@ngrx/store';
import { FeedCategoriesListComponent } from './feed-categories-list/feed-categories-list.component';
import { CategoryMappingComponent } from './category-mapping/category-mapping.component';
import { CategoryMappingService } from './category-mapping/category-mapping.service';

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

    protected categoryMappingFilter;
    protected subscription: Subscription;

    constructor(protected matDialog: MatDialog,
                protected feedService: FeedService,
                protected route: ActivatedRoute,
                protected appStore: Store<AppState>,
                protected changeDetectorRef: ChangeDetectorRef,
                protected categoryMappingService: CategoryMappingService) {
    }


    @HostListener('window:beforeunload', ['$event'])
    handleBeforeUnload() {
        if (this.hasModifications()) {
            return confirm('Unsaved data can be lost, continue?');
        }
    }

    hasModifications() {
        return Boolean(this.categoryMapping.searchChannelCategoryControl.value);
    }

    ngOnInit() {
        this.route.data.subscribe(({data}) => {
            this.channel = data.channel;
            this.feed = data.feed;
            this.refreshPageData();

            this.listenClientCategorySearch();
            this.listenCategoryMappingChanged();
        });
    }

    onAutotagsLoaded() {
        this.categoryMapping.loading = false
    }

    openFilterDialog() {
        this.matDialog.open(FilterDialogComponent, {data: this.categoryMappingFilter}).afterClosed().subscribe(state => {
            if (typeof state !== 'undefined') {
                this.categoryMappingFilter = state;
                this.refreshCategoriesList();
            }
        });
    }


    showCloseDialog() {
        return this.matDialog.open(UnsavedDataDialogComponent);
    }

    refreshPageData() {
        this.refreshCategoriesList();
        this.refreshPercentage();
    }

    refreshCategoriesList() {
        this.processingClientCategorySearch = true;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.subscription = this.feedService.fetchCategoryCollection(this.feed.id, {
            page: (this.feedCategoriesList.currentPage + 1).toString(),
            limit: this.feedCategoriesList.itemsPerPage,
            name: this.searchClientCategoryControl.value,
            mapping: this.categoryMappingFilter,
        }).subscribe(categories => {
            this.categories = categories._embedded.category;
            this.feedCategoriesList.totalCategoriesNumber = categories.total;
            this.processingClientCategorySearch = false;
            if (this.categories.length > 0) {
                this.feedCategoriesList.chooseClientCategory(this.categories[0]);
            }
        }, error => {
            if (error.status === CONFLICT_ERROR_CODE) {
                this.feedCategoriesList.setPage(error.pages - 1);
                this.refreshCategoriesList();
            }
        });
    }

    protected listenCategoryMappingChanged() {
        this.categoryMappingService.getState().subscribe(channelCategory => {
            const index = this.categories.findIndex(cat => cat.id === this.feedCategoriesList.chosenClientsCategory.id);
            this.categories[index].channelCategory = channelCategory;
            this.changeDetectorRef.detectChanges();
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
        this.feedService.fetchCategoryCollection(this.feed.id, {mapping: CategoryMapping.Mapped, limit: '1'})
            .subscribe((mapped) => {
                const total = this.feedCategoriesList.totalCategoriesNumber;
                this.percentage = total ? mapped.total / total : 0;
            })
    }

}
