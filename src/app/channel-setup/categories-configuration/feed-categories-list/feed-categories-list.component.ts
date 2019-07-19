import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeedCategory } from '../../../core/entities/feed-category';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'sf-feed-categories-list',
    templateUrl: './feed-categories-list.component.html',
    styleUrls: ['./feed-categories-list.component.scss']
})
export class FeedCategoriesListComponent implements OnInit {

    @Input() categories: FeedCategory[];
    @Output() pageChanged = new EventEmitter();

    /** matched categories */
    chosenClientsCategory: FeedCategory;

    /** pagination */
    itemsPerPage = '10';
    currentPage = 0;
    totalCategoriesNumber = 0;
    pageSizeOptions = [10, 25, 50, 100];

    constructor() {
    }

    ngOnInit() {
    }

    chooseClientCategory(category: FeedCategory) {
        this.chosenClientsCategory = category;
    }

    chooseNextClientCategory() {
        const index = this.categories.indexOf(this.chosenClientsCategory);
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
