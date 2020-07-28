import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { debounceTime, filter, flatMap, publishReplay, startWith, switchMap, take, tap } from 'rxjs/operators';
import { Category } from '../../../core/entities/category';
import { ChannelService } from '../../../core/services/channel.service';
import { FeedService } from '../../../core/services/feed.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectableObservable, Observable, Subscription } from 'rxjs';
import { CategoryMappingService } from '../category-mapping.service';
import { MappingCacheService } from '../mapping-cache.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { PagedResponse } from 'sfl-shared/entities';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;
const searchLimit = '200';

@Component({
    selector: 'sf-category-mapping',
    templateUrl: './category-mapping.component.html',
    styleUrls: ['./category-mapping.component.scss'],
    providers: []
})
export class CategoryMappingComponent implements OnInit, OnDestroy {

    @Input() channelId: number;

    @ViewChild('categoryMappingInput', {static: false}) categoryMappingInput: ElementRef<HTMLInputElement>;
    @ViewChild(MatAutocompleteTrigger, {static: false}) autocompleteTrigger: MatAutocompleteTrigger;

    catalogCategoryId: number;
    feedId: number;
    channelCategoryMappingFromCurrentItem: Category;

    processingSearch = false;

    chosenChannelCategory: Category;
    searchChannelCategoryControl = new FormControl('', [
        (control: AbstractControl) =>
            // we allow only either an empty value to delete the mapping
            (!this.chosenChannelCategory && (control.value !== '' || control.pristine && control.touched))
            // or the value from an autocomplete list. If the a user modifies the value, we force to select the value from a list
            || (this.chosenChannelCategory?.name !== control.value?.name)
                ? {categoryMappingEmpty: true}
                : null,
    ]);
    channelCategoryOptions: Category[] = [];
    saveInProgress = false;
    cachedMapping: Category;

    // pagination
    currentPage = 1;
    hasNextPage = false;
    loadingNextPage = false;

    initialSuggestions: Observable<PagedResponse<{ category: Category[] }>>;
    subscriptions = new Subscription();

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

    displayFn(category: Category) {
        return category ? category.name : undefined;
    }

    ngOnInit() {
        this.listenChannelCategorySearch();
        const subscription = this.categoryMappingService.getCurrentMapping().subscribe(({mapping}) => {
            this.catalogCategoryId = mapping.catalogCategoryId;
            this.feedId = mapping.feedId;
            this.searchChannelCategoryControl.reset(mapping.channelCategory);
            this.searchChannelCategoryControl.markAsPristine();
            this.chosenChannelCategory = mapping.channelCategory;
            this.cachedMapping = this.mappingCache.getCategoryMapping()?.channelCategory;
            if (this.categoryMappingInput) {
                this.categoryMappingInput.nativeElement.focus();
            }
            if (!this.searchChannelCategoryControl.value) {
                this.searchChannelCategoryControl.setValue('');
            }
        });
        this.subscriptions.add(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    saveMatching() {
        if (this.searchChannelCategoryControl.invalid) {
            return;
        }
        if (this.channelCategoryMappingFromCurrentItem
            && this.chosenChannelCategory
            && this.channelCategoryMappingFromCurrentItem.id === this.chosenChannelCategory.id) {
            // not allow to send save request for the same category to prevent side effect
            return;
        }
        this.saveInProgress = true;
        this.categoryMappingService.saveNewMapping(this.catalogCategoryId, this.feedId, this.chosenChannelCategory)
            .subscribe(() => this.afterSave());

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
        this.searchChannelCategoryControl.updateValueAndValidity({emitEvent: false});
    }

    loadNextPage(event) {
        event.stopPropagation();
        this.loadingNextPage = true;
        this.fetchCategories(this.searchChannelCategoryControl.value, this.currentPage + 1).subscribe(response => {
            this.currentPage = +response.page;
            this.hasNextPage = +response.pages > this.currentPage;
            this.channelCategoryOptions.push(...response._embedded.category);
            this.loadingNextPage = false;
        });
    }

    onBlur() {
        if (this.searchChannelCategoryControl.pristine && this.searchChannelCategoryControl.touched) {
            this.searchChannelCategoryControl.updateValueAndValidity({emitEvent: false});
        }
    }

    protected afterSave() {
        this.searchChannelCategoryControl.markAsPristine();
        this.saveInProgress = false;
    }

    protected fetchCategories(search: string, page = 1) {
        if (!search && page === 1) {
            if (!this.initialSuggestions) {
                this.initialSuggestions = this.doFetchCategories(search, page).pipe(publishReplay());
                (<ConnectableObservable<any>>this.initialSuggestions).connect();
            }
            return this.initialSuggestions;
        }
        return this.doFetchCategories(search, page);
    }

    protected doFetchCategories(search: string, page = 1) {
        return this.appStore.select('currentStore').pipe(
            take(1),
            flatMap(store => this.channelService.getChannelCategories(this.channelId, {
                name: search,
                country: store.country,
                limit: searchLimit,
                page: page.toString(),
            }))
        );
    }

    protected listenChannelCategorySearch() {
        const subscription = this.searchChannelCategoryControl.valueChanges.pipe(
            startWith(''),
            tap(() => this.processingSearch = true),
            tap(() => this.hasNextPage = false),
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH || searchQuery === ''),
            switchMap(name => this.fetchCategories(name)))
            .subscribe(response => {
                this.processingSearch = false;
                this.channelCategoryOptions = Object.assign([], response._embedded.category);
                this.currentPage = 1;
                this.hasNextPage = +response.pages > this.currentPage;
                if (!this.searchChannelCategoryControl.value) {
                    this.autocompleteTrigger.openPanel();
                }
            });
        this.subscriptions.add(subscription);
    }

}
