import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { ChannelService } from '../../core/services/channel.service';
import { ChannelMap } from '../../core/entities/channel-map.enum';
import { Category } from '../../core/entities/category';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, flatMap, switchMap, tap } from 'rxjs/operators';
import { FeedService } from '../../core/services/feed.service';
import { Store } from '@ngrx/store';
import { Store as UserStore } from 'sfl-shared/entities';
import { AppState } from '../../core/entities/app-state';
import { FeedCategory } from '../../core/entities/feed-category';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

@Component({
    templateUrl: './categories-configuration.component.html',
    styleUrls: ['./categories-configuration.component.scss']
})
export class CategoriesConfigurationComponent implements OnInit {

    itemsPerPage = '10';
    currentPage = 0;
    totalCategoriesNumber = 0;
    searchChannelCategoryControl = new FormControl();
    searchClientCategoryControl = new FormControl();

    processingClientCategorySearch = false;

    channelCategoryOptions: Category[] = [];

    chosenClientsCategoryId: number;
    chosenChannelCategory: Category;

    categories: FeedCategory[];

    subscription: Subscription;

    constructor(protected matDialog: MatDialog,
                protected channelService: ChannelService,
                protected feedService: FeedService,
                protected appStore: Store<AppState>) {
    }

    displayFn(category: Category) {
        return category ? category.name : undefined;
    }

    ngOnInit() {
        this.updateData();

        this.searchChannelCategoryControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH),
            switchMap(name => this.channelService.getChannelCategories(ChannelMap.amazon, {name})),
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

    }

    pageChanged(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.updateData();
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
            }))).subscribe(categories => {
                this.categories = categories._embedded.category;
                this.totalCategoriesNumber = categories.total;
                this.processingClientCategorySearch = false;
            });
    }

}
