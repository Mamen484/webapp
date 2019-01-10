import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { ChannelService } from '../../core/services/channel.service';
import { Category } from '../../core/entities/category';
import { Subscription, zip } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { FeedService } from '../../core/services/feed.service';
import { Store } from '@ngrx/store';
import { Channel } from 'sfl-shared/entities';
import { AppState } from '../../core/entities/app-state';
import { FeedCategory } from '../../core/entities/feed-category';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryMapping } from '../category-mapping';
import { Feed } from '../../core/entities/feed';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

@Component({
    templateUrl: './categories-configuration.component.html',
    styleUrls: ['./categories-configuration.component.scss']
})
export class CategoriesConfigurationComponent implements OnInit {

    channel: Channel;
    feed: Feed;

    itemsPerPage = '10';
    currentPage = 0;
    totalCategoriesNumber = 0;
    searchChannelCategoryControl = new FormControl();
    searchClientCategoryControl = new FormControl();
    categoryMappingFilter;

    processingClientCategorySearch = false;

    channelCategoryOptions: Category[] = [];

    chosenClientsCategoryId: number;
    chosenChannelCategory: Category;

    categories: FeedCategory[];

    subscription: Subscription;
    percentage = 0;

    constructor(protected matDialog: MatDialog,
                protected channelService: ChannelService,
                protected feedService: FeedService,
                protected appStore: Store<AppState>,
                protected route: ActivatedRoute) {
    }

    displayFn(category: Category) {
        return category ? category.name : undefined;
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
        this.currentPage = event.pageIndex;
        this.updateData();
    }

    resetMatching() {
        this.searchChannelCategoryControl.reset();
        this.chosenChannelCategory = undefined;
    }

    saveMatching() {
        this.resetMatching();
        this.updatePercentage();
    }

    protected listenChannelCategorySearch() {
        this.searchChannelCategoryControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH),
            switchMap(name => this.channelService.getChannelCategories(this.channel.id, {name})),
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
                this.chosenClientsCategoryId = this.categories[0].id;
            }
        });
    }

    protected updatePercentage() {
        zip(
            this.feedService.fetchCategoryCollection(this.feed.id, {mapping: CategoryMapping.Mapped}),
            this.feedService.fetchCategoryCollection(this.feed.id, {mapping: CategoryMapping.Unmapped})
        ).subscribe(([mapped, unmapped]) => {
            const total = mapped.total + unmapped.total;
            this.percentage = total ? mapped.total / total : 0;
        })
    }

}
