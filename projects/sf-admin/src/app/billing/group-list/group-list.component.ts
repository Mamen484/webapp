import { Component, OnInit } from '@angular/core';
import { debounceTime, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { BillingGroupService } from './billing-group.service';
import { BillingGroup } from './billing-group';
import { PageEvent } from '@angular/material';

const SNACKBAR_MESSAGE_DURATION = 5000;
const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

@Component({
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

    dataSource: BillingGroup[];
    displayedColumns: string[] = ['id', 'name', 'edit'];
    isLoadingResults = true;

    pageSizeOptions = [10, 15, 25, 50, 100];
    pageSize = 15;
    resultsLength = 0;
    currentPage = 0;

    searchControl = new FormControl();
    searchQuery = '';
    dataSubscription;

    constructor(protected billingGroupService: BillingGroupService) {
    }

    ngOnInit() {
        this.searchControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => !searchQuery || searchQuery.length >= MIN_QUERY_LENGTH),
        ).subscribe(searchQuery => {
            this.searchQuery = searchQuery;
            this.isLoadingResults = true;
            // search changes the number of results, so previously specified page may not exist, reset page
            this.currentPage = 0;
            this.fetchData();
        });
        this.fetchData();
    }

    fetchData() {
        if (this.dataSubscription) {
            this.dataSubscription.unsubscribe();
        }
        this.dataSubscription = this.billingGroupService.fetchGroupCollection({
            limit: this.pageSize,
            page: this.currentPage + 1,
            search: this.searchQuery
        }).subscribe(groupList => {
            this.dataSource = groupList._embedded.group;
            this.isLoadingResults = false;
            this.resultsLength = groupList.total;
        });
    }

    openCreateGroupDialog() {

    }

    openEditStoreDialog() {

    }

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


}
