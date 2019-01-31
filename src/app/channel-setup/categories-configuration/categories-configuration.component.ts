import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { ChannelService } from '../../core/services/channel.service';
import { Category } from '../../core/entities/category';
import { Subscription, zip } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, flatMap, switchMap, tap } from 'rxjs/operators';
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

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;
const CONFLICT_ERROR_CODE = 409;

@Component({
    templateUrl: './categories-configuration.component.html',
    styleUrls: ['./categories-configuration.component.scss']
})
export class CategoriesConfigurationComponent implements OnInit {

    channel: Channel;
    feed: Feed;

    /** pagination */
    itemsPerPage = '10';
    currentPage = 0;
    totalCategoriesNumber = 0;
    pageSizeOptions = [10, 25, 50, 100];

    /** client category search */
    searchClientCategoryControl = new FormControl();
    processingClientCategorySearch = false;
    categories: FeedCategory[];

    /** channel category autocomplete */
    searchChannelCategoryControl = new FormControl();
    channelCategoryOptions: Category[] = [];

    /** matched categories */
    chosenClientsCategoryId: number;
    chosenChannelCategory: Category;

    /** percentage of matched categories */
    percentage = 0;

    protected categoryMappingFilter;
    protected subscription: Subscription;

    constructor(protected matDialog: MatDialog,
                protected channelService: ChannelService,
                protected feedService: FeedService,
                protected route: ActivatedRoute,
                protected appStore: Store<AppState>) {
    }

    @HostListener('window:beforeunload', ['$event'])
    handleBeforeUnload() {
        if (this.hasModifications()) {
            return confirm('Unsaved data can be lost, continue?');
        }
    }

    displayFn(category: Category) {
        return category ? category.name : undefined;
    }

    hasModifications() {
        return Boolean(this.chosenChannelCategory || this.searchChannelCategoryControl.value);
    }

    ngOnInit() {
        this.route.data.subscribe(({data}) => {
            this.channel = data.channel;
            this.feed = data.feed;
            this.updateData();
            this.updatePercentage();

            this.listenChannelCategorySearch();
            this.listenClientCategorySearch();
        });
    }

    openFilterDialog() {
        this.matDialog.open(FilterDialogComponent).afterClosed().subscribe(state => {
            if (typeof state !== 'undefined') {
                this.categoryMappingFilter = state;
                this.updateData();
            }
        });
    }

    pageChanged(event: PageEvent) {
        if (event.pageIndex === event.previousPageIndex) {
            this.itemsPerPage = String(event.pageSize);
            this.currentPage = 0;
        } else {
            this.currentPage = event.pageIndex;
        }

        this.updateData();
    }

    resetMatching() {
        this.searchChannelCategoryControl.reset();
        this.chosenChannelCategory = undefined;
    }

    saveMatching() {
        if (!this.chosenChannelCategory || !this.chosenClientsCategoryId) {
            return;
        }
        this.feedService.mapFeedCategory(this.feed.id, this.chosenClientsCategoryId, this.chosenChannelCategory.id)
            .subscribe(() => {
                this.resetMatching();
                this.updateData();
                this.updatePercentage();
            });

    }

    showCloseDialog() {
        return this.matDialog.open(UnsavedDataDialogComponent);
    }

    protected listenChannelCategorySearch() {
        this.searchChannelCategoryControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH),
            switchMap(name =>
                this.appStore.select('currentStore').pipe(
                    flatMap(store => this.channelService.getChannelCategories(this.channel.id, {name, country: store.country})))
            ),
        )
            .subscribe(response => this.channelCategoryOptions = response._embedded.category);
    }

    protected listenClientCategorySearch() {
        this.searchClientCategoryControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery.length >= MIN_QUERY_LENGTH || searchQuery.length === 0),
            tap(() => this.currentPage = 0),
        )
            .subscribe(() => this.updateData());
    }

    protected updateData() {
        this.processingClientCategorySearch = true;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.feedService.fetchCategoryCollection(this.feed.id, {
            page: (this.currentPage + 1).toString(),
            limit: this.itemsPerPage,
            name: this.searchClientCategoryControl.value,
            mapping: this.categoryMappingFilter,
        }).subscribe(categories => {
            this.categories = categories._embedded.category;
            this.totalCategoriesNumber = categories.total;
            this.processingClientCategorySearch = false;
            if (this.categories.length > 0) {
                this.chosenClientsCategoryId = this.categories[0].catalogCategory.id;
            }
        }, error => {
            if (error.status === CONFLICT_ERROR_CODE) {
                this.currentPage = error.pages - 1;
                this.updateData();
            }
        });
    }

    protected updatePercentage() {
        zip(
            this.feedService.fetchCategoryCollection(this.feed.id, {mapping: CategoryMapping.Mapped, limit: '1'}),
            this.feedService.fetchCategoryCollection(this.feed.id, {mapping: CategoryMapping.Unmapped, limit: '1'})
        ).subscribe(([mapped, unmapped]) => {
            const total = mapped.total + unmapped.total;
            this.percentage = total ? mapped.total / total : 0;
        })
    }

}
