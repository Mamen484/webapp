import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { debounceTime, filter, flatMap, switchMap } from 'rxjs/operators';
import { Category } from '../../../core/entities/category';
import { ChannelService } from '../../../core/services/channel.service';
import { FeedService } from '../../../core/services/feed.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { FeedCategory } from '../../../core/entities/feed-category';
import { CategoryMappingService } from './category-mapping.service';
import { MappingCacheService } from '../mapping-cache.service';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;
const maxApiLimit = '200';

@Component({
    selector: 'sf-category-mapping',
    templateUrl: './category-mapping.component.html',
    styleUrls: ['./category-mapping.component.scss']
})
export class CategoryMappingComponent implements OnInit, OnChanges {

    @Input() channelId: number;
    @Input() feedCategory: FeedCategory;

    chosenChannelCategory: Category;
    searchChannelCategoryControl = new FormControl('', [
        (control: AbstractControl) =>
            // we allow only either an empty value to delete the mapping
            (!this.chosenChannelCategory && control.value !== '')
            // or the value from an autocomplete list. If the a user modifies the value, we force to select the value from a list
            || (this.chosenChannelCategory && control.value && this.chosenChannelCategory.name !== control.value.name)
                ? {categoryMappingEmpty: true}
                : null,
    ]);
    channelCategoryOptions: Category[] = [];
    searchSubscription: Subscription;
    loading = false;
    hasCachedMapping = false;

    constructor(protected channelService: ChannelService,
                protected feedService: FeedService,
                protected appStore: Store<AppState>,
                protected snackbar: MatSnackBar,
                protected categoryMappingService: CategoryMappingService,
                protected mappingCache: MappingCacheService) {
    }

    chooseCategory(category: Category) {
        this.chosenChannelCategory = category;
        this.searchChannelCategoryControl.reset(category);
        this.searchChannelCategoryControl.markAsDirty();
    }

    ngOnChanges({feedCategory}: SimpleChanges) {
        if (feedCategory.previousValue
            && feedCategory.previousValue.id === feedCategory.currentValue.id) {
            return;
        }
        this.searchChannelCategoryControl.reset(this.feedCategory.channelCategory);
        this.searchChannelCategoryControl.markAsPristine();
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
        this.loading = Boolean(this.feedCategory.channelCategory);
        this.chosenChannelCategory = this.feedCategory.channelCategory;
        this.hasCachedMapping = this.mappingCache.hasCategoryMapping();
    }

    displayFn(category: Category) {
        return category ? category.name : undefined;
    }

    ngOnInit() {
        this.listenChannelCategorySearch();
    }

    saveMatching() {
        if (this.searchChannelCategoryControl.invalid) {
            return;
        }
        if (this.feedCategory.channelCategory
            && this.chosenChannelCategory
            && this.feedCategory.channelCategory.id === this.chosenChannelCategory.id) {
            // not allow to send save request for the same category to prevent side effect
            return;
        }
        this.loading = true;
        this.feedService.mapFeedCategory(
            this.feedCategory.feedId,
            this.feedCategory.catalogCategory.id,
            this.chosenChannelCategory
                // modify mapping
                ? this.chosenChannelCategory.id
                // remove mapping
                : null
        )
            .subscribe(() => {
                this.searchChannelCategoryControl.markAsPristine();
                this.categoryMappingService.notifyMappingChange(<Category>this.chosenChannelCategory);
                this.mappingCache.addCategoryMapping(this.chosenChannelCategory);
                // we don't wait for autotags loading, so we can hide the progress bar immediately
                if (!this.chosenChannelCategory) {
                    this.loading = false;
                }
            });

    }

    /**
     * Remove the chosenChannelCategory value when the input cleared
     */
    watchDeletion() {
        if (this.searchChannelCategoryControl.value === '') {
            this.chosenChannelCategory = null;
        }
    }

    removeValue() {
        this.searchChannelCategoryControl.reset('');
        this.searchChannelCategoryControl.markAsDirty();
        this.chosenChannelCategory = null;
    }

    usePreviousMapping() {
        this.chooseCategory(this.mappingCache.getCategoryMapping());
    }


    protected listenChannelCategorySearch() {
        this.searchChannelCategoryControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH),
            switchMap(name =>
                this.appStore.select('currentStore').pipe(
                    flatMap(store => this.channelService.getChannelCategories(this.channelId, {
                        name,
                        country: store.country,
                        limit: maxApiLimit,
                    })))
            ),
        )
            .subscribe(response => this.channelCategoryOptions = response._embedded.category);
    }

}
