import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { ChannelService } from '../../core/services/channel.service';
import { ChannelMap } from '../../core/entities/channel-map.enum';
import { Category } from '../../core/entities/category';
import { Subscription, zip } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, flatMap, switchMap, take, tap } from 'rxjs/operators';
import { FeedService } from '../../core/services/feed.service';
import { Store } from '@ngrx/store';
import { Channel, Store as UserStore } from 'sfl-shared/entities';
import { AppState } from '../../core/entities/app-state';
import { FeedCategory } from '../../core/entities/feed-category';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryMapping } from '../category-mapping';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

@Component({
    templateUrl: './categories-configuration.component.html',
    styleUrls: ['./categories-configuration.component.scss']
})
export class CategoriesConfigurationComponent implements OnInit {

    channel: Channel;

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
        this.route.data.subscribe(({channel}) => this.channel = channel);
        this.updateData();
        this.updatePercentage();

        this.searchChannelCategoryControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH),
            switchMap(name => this.channelService.getChannelCategories(this.channel.id, {name})),
        )
            .subscribe(response => this.channelCategoryOptions = response._embedded.category);

        this.searchClientCategoryControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH),
            tap(() => this.currentPage = 0),
        )
            .subscribe(() => this.updateData());
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

    protected updateData() {
        this.processingClientCategorySearch = true;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }


        this.subscription = this.appStore.select('currentStore')
            .pipe(flatMap((store: UserStore) => this.feedService.fetchCategoryCollection(store.id, {
                page: (this.currentPage + 1).toString(),
                limit: this.itemsPerPage,
                name: this.searchClientCategoryControl.value,
                mapping: this.categoryMappingFilter,
            }))).subscribe(categories => {
                this.categories = categories._embedded.category;
                this.totalCategoriesNumber = categories.total;
                this.processingClientCategorySearch = false;
                if (this.categories.length > 0) {
                    this.chosenClientsCategoryId = this.categories[0].id;
                }
            });
    }

    protected updatePercentage() {
        this.appStore.select('currentStore').pipe(take(1), flatMap(store =>
            zip(
                this.feedService.fetchCategoryCollection(store.id, {mapping: CategoryMapping.Mapped}),
                this.feedService.fetchCategoryCollection(store.id, {mapping: CategoryMapping.Unmapped})
            )))
            .subscribe(([mapped, unmapped]) => {
                const total = mapped.total + unmapped.total;
                this.percentage = total ? mapped.total / total : 0;
            })
    }

}
