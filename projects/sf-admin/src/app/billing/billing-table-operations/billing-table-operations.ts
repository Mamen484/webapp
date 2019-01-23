import { PageEvent } from '@angular/material';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export abstract class BillingTableOperations<T> implements OnInit {

    /** paginator */
    pageSizeOptions = [10, 15, 25, 50, 100];
    pageSize = 15;
    currentPage = 0;

    /** search */
    searchControl = new FormControl();
    searchQuery = '';

    /** data processing */
    dataSource: T[];
    dataSubscription;
    resultsLength = 0;
    isLoadingResults = true;

    protected abstract fetchCollection(params: {
        limit: number,
        page: number,
        search: string
    }): Observable<{ total: number, dataList: any[] }>;

    pageChanged(event: PageEvent) {
        if (event.pageIndex === event.previousPageIndex) {
            this.pageSize = event.pageSize;
            // we need to reset the current page to 1, because if we change the pageSize to a bigger value,
            // previously specified page might not exist
            this.currentPage = 0;
        } else {
            this.currentPage = event.pageIndex;
        }
        this.isLoadingResults = true;
        this.fetchData();
    }

    ngOnInit() {
        this.fetchData();
    }

    search(searchQuery) {
        this.searchQuery = searchQuery;
        this.isLoadingResults = true;
        // search changes the number of results, so previously specified page may not exist, reset page
        this.currentPage = 0;
        this.fetchData();
    }

    protected fetchData() {
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
        this.dataSubscription = this.fetchCollection({
            limit: this.pageSize,
            page: this.currentPage + 1,
            search: this.searchQuery
        }).subscribe(({total, dataList}) => {
            this.dataSource = dataList;
            this.isLoadingResults = false;
            this.resultsLength = total;
        });
    }
}
