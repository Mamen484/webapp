import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FeedCategory } from '../../../core/entities/feed-category';
import { PageEvent } from '@angular/material';
import { CategoryState } from '../../category-state';

@Component({
    selector: 'sf-feed-categories-list',
    templateUrl: './feed-categories-list.component.html',
    styleUrls: ['./feed-categories-list.component.scss']
})
export class FeedCategoriesListComponent implements OnChanges {

    @Input() categories: FeedCategory[];
    @Output() pageChanged = new EventEmitter();

    categoryState = CategoryState;

    /** matched categories */
    chosenCatalogCategory: FeedCategory;

    /** pagination */
    itemsPerPage = '10';
    currentPage = 0;
    totalCategoriesNumber = 0;
    pageSizeOptions = [10, 25, 50, 100];

    constructor() {
    }

    ngOnChanges() {
        if (this.categories && this.categories.length) {
            const category = this.chosenCatalogCategory
                ? this.categories.find(cat => this.chosenCatalogCategory.id === cat.id)
                : null;
            this.chosenCatalogCategory = category || this.categories[0];
        }
    }

    chooseClientCategory(category: FeedCategory) {
        this.chosenCatalogCategory = category;
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

        this.pageChanged.emit();
    }

    setPage(page: number) {
        this.currentPage = page;
    }

}
