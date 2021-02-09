import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OnDestroy, OnInit, Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Directive()
export abstract class TableOperations<T> implements OnInit, OnDestroy {

    /** paginator */
    pageSizeOptions = [10, 15, 25, 50, 100];
    pageSize = 15;
    currentPage = 0;

    /** search */
    searchControl = new FormControl();
    searchQuery = '';

    /** data processing */
    dataSource = new MatTableDataSource<T>();
    dataSubscription: Subscription;
    resultsLength = 0;
    isLoadingResults = true;

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

    ngOnDestroy() {
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
    }

    search(searchQuery) {
        this.searchQuery = searchQuery;
        this.isLoadingResults = true;
        // search changes the number of results, so previously specified page may not exist, reset page
        this.currentPage = 0;
        this.fetchData();
    }

    protected abstract fetchCollection(params: {
        limit: number,
        page: number,
        search: string
    }): Observable<{ total: number, dataList: any[] }>;

    protected fetchData() {
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
        this.dataSubscription = this.fetchCollection({
            limit: this.pageSize,
            page: this.currentPage + 1,
            search: this.searchQuery
        }).subscribe(({total, dataList}) => {
            this.dataSource.data = dataList;
            this.resultsLength = total;
            this.afterApplyingData();
        });
    }

    protected afterApplyingData() {
        this.isLoadingResults = false;
    }
}
