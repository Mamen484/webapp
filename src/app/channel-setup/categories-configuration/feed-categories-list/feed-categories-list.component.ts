import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FeedCategory } from '../../../core/entities/feed-category';
import { PageEvent } from '@angular/material/paginator';
import { CategoryState } from '../../category-state';
import { Observable, Subscription } from 'rxjs';
import { FeedService } from '../../../core/services/feed.service';
import { FilterDialogComponent } from '../../filter-dialog/filter-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CategoryMappingService } from '../category-mapping/category-mapping.service';
import { CdkScrollable } from '@angular/cdk/overlay';

const CONFLICT_ERROR_CODE = 409;

@Component({
    selector: 'sf-feed-categories-list',
    templateUrl: './feed-categories-list.component.html',
    styleUrls: ['./feed-categories-list.component.scss']
})
export class FeedCategoriesListComponent implements OnInit {

    @ViewChild(CdkScrollable, {static: true}) feedCategoriesContainer: CdkScrollable;

    @Output() updated = new EventEmitter();

    categoryState = CategoryState;

    /** matched categories */
    chosenCatalogCategory: FeedCategory;

    /** pagination */
    itemsPerPage = '10';
    currentPage = 0;
    totalCategoriesNumber = 0;
    pageSizeOptions = [10, 25, 50, 100];

    /** applied filter */
    categoryStateOptions = CategoryState;
    categoryStateFilter: CategoryState;

    /** client category search */
    searchedCategoryQuery = '';
    categories: FeedCategory[];

    feedId: number;
    channelType: 'shopbot' | string;

    processingClientCategorySearch = false;
    protected subscription: Subscription;

    constructor(protected feedService: FeedService,
                protected matDialog: MatDialog,
                protected route: ActivatedRoute,
                protected categoryMappingService: CategoryMappingService,) {
    }

    ngOnInit() {
        this.route.data.subscribe(({data}) => {
            this.channelType = data.channel.type;
            this.feedId = data.feed.id;
            this.refreshCategoriesList().subscribe();
            this.listenCategoryMappingChanged();
        });

    }

    cancelFilter() {
        this.categoryStateFilter = CategoryState.NotSpecified;
        this.refreshCategoriesList().subscribe();
    }

    chooseClientCategory(category: FeedCategory) {
        this.chosenCatalogCategory = category;
        this.categoryMappingService.setCurrentMapping({catalogCategory: category, channelCategory: category.channelCategory});
    }

    chooseNextCatalogCategory() {
        const index = this.categories.indexOf(this.chosenCatalogCategory);
        if (index < this.categories.length - 1) {
            this.chooseClientCategory(this.categories[index + 1]);
            return;
        }
        if (this.currentPage < (this.totalCategoriesNumber / Number(this.itemsPerPage) - 1)) {
            this.changePage({
                pageIndex: this.currentPage + 1,
                previousPageIndex: this.currentPage,
                pageSize: Number(this.itemsPerPage),
                length: this.totalCategoriesNumber
            });
        }
    }

    changePage(event: PageEvent) {
        if (event.pageIndex === event.previousPageIndex) {
            this.itemsPerPage = String(event.pageSize);
            this.currentPage = 0;
        } else {
            this.currentPage = event.pageIndex;
        }

        this.refreshCategoriesList().subscribe();
        this.feedCategoriesContainer.scrollTo({top: 0});
    }

    searchClientCategory(value) {
        this.searchedCategoryQuery = value;
        this.refreshCategoriesList().subscribe();
    }

    setPage(page: number) {
        this.currentPage = page;
    }

    refreshCategoriesList(silently = false) {
        if (!silently) {
            this.processingClientCategorySearch = true;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        return new Observable(observer => {
            this.subscription = this.feedService.fetchCategoryCollection(this.feedId, {
                page: (this.currentPage + 1).toString(),
                limit: this.itemsPerPage,
                name: this.searchedCategoryQuery,
                state: this.categoryStateFilter,
            }).subscribe(categories => {
                this.categories = categories._embedded.category;
                this.totalCategoriesNumber = categories.total;
                this.processingClientCategorySearch = false;
                this.updated.emit();

                const category = this.chosenCatalogCategory
                    ? this.categories.find(cat => this.chosenCatalogCategory.id === cat.id)
                    : null;
                this.chooseClientCategory(category || this.categories[0]);
                observer.next();
                observer.complete();
            }, error => {
                if (error.status === CONFLICT_ERROR_CODE) {
                    this.setPage(error.pages - 1);
                    this.refreshCategoriesList().subscribe();
                }
                observer.error();
            });
        });
    }

    openFilterDialog() {
        this.matDialog.open(FilterDialogComponent, {data: this.categoryStateFilter}).afterClosed().subscribe(state => {
            if (typeof state !== 'undefined') {
                this.categoryStateFilter = state;
                this.refreshCategoriesList().subscribe();
            }
        });
    }

    protected listenCategoryMappingChanged() {
        this.categoryMappingService.getChanges().subscribe(channelCategory => {
                this.refreshCategoriesList(true).subscribe();
            }
        );
    }

}
