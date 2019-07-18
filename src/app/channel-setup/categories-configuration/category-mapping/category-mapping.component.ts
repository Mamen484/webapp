import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { debounceTime, filter, flatMap, map, switchMap } from 'rxjs/operators';
import { Category } from '../../../core/entities/category';
import { ChannelService } from '../../../core/services/channel.service';
import { FeedService } from '../../../core/services/feed.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { MatSnackBar } from '@angular/material';
import { SettingsSavedSnackbarComponent } from '../settings-saved-snackbar/settings-saved-snackbar.component';
import { SuccessSnackbarConfig } from '../../../core/entities/success-snackbar-config';
import { of, Subscription, zip } from 'rxjs';
import { FeedCategory } from '../../../core/entities/feed-category';
import { environment } from '../../../../environments/environment';
import { ngxCsv } from 'ngx-csv';
import { times } from 'lodash';
import { CategoryMappingService } from './category-mapping.service';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

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

    processingDownload = false;

    constructor(protected channelService: ChannelService,
                protected feedService: FeedService,
                protected appStore: Store<AppState>,
                protected snackbar: MatSnackBar,
                protected categoryMappingService: CategoryMappingService) {
    }

    ngOnChanges() {
        this.searchChannelCategoryControl.reset(this.feedCategory.channelCategory);
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
        this.loading = Boolean(this.feedCategory.channelCategory);
        this.chosenChannelCategory = this.feedCategory.channelCategory;

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
                this.categoryMappingService.notifyMappingChange(<Category>this.chosenChannelCategory);
                this.snackbar.openFromComponent(SettingsSavedSnackbarComponent, new SuccessSnackbarConfig());
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

    downloadCategoryList(event) {
        event.preventDefault();
        this.processingDownload = true;
        this.getCategoriesList().subscribe(categoriesList => {
            const csv = new ngxCsv(categoriesList, this.channelId + '-category-mapping', {
                fieldSeparator: ';',
                decimalseparator: ',',
            });
            this.processingDownload = false;
        })
    }

    getCategoriesList() {
        return this.fetchCategoriesForPage(1)
            .pipe(flatMap(response => {
                if (response.pages > 1) {
                    return zip(...times(response.pages - 1).map(num => this.fetchCategoriesForPage(num + 2))
                    ).pipe(map(([...responses]) => responses.reduce(
                        (acc, currentResponse) => acc.concat(this.formatCategoriesArrayForCsv(currentResponse._embedded.category)),
                        this.formatCategoriesArrayForCsv(response._embedded.category)
                        )
                    ))
                }
                return of(this.formatCategoriesArrayForCsv(response._embedded.category));
            }));
    }

    protected listenChannelCategorySearch() {
        this.searchChannelCategoryControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH),
            switchMap(name =>
                this.appStore.select('currentStore').pipe(
                    flatMap(store => this.channelService.getChannelCategories(this.channelId, {
                        name,
                        country: store.country
                    })))
            ),
        )
            .subscribe(response => this.channelCategoryOptions = response._embedded.category);
    }

    protected formatCategoriesArrayForCsv(category: Category[]) {
        return category.map(({name}) => ({name}));
    }

    protected fetchCategoriesForPage(page: number) {
        return this.channelService.getChannelCategories(this.channelId, {
            limit: environment.maxApiLimit,
            page: String(page)
        })
    }

}
