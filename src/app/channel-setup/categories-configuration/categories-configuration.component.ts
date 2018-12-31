import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { AmazonAccountDialogComponent } from '../amazon-account-dialog/amazon-account-dialog.component';
import { WelcomeInstructionsComponent } from '../welcome-instructions/welcome-instructions.component';
import { ChannelService } from '../../core/services/channel.service';
import { ChannelMap } from '../../core/entities/channel-map.enum';
import { Category } from '../../core/entities/category';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { FeedService } from '../../core/services/feed.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';

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
    searchControl = new FormControl();
    channelCategoryOptions: Category[] = [];

    chosenClientsCategoryId: number;
    chosenChannelCategory: Category;

    categories: Category[];

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
        // prevent 'Expression has changed after it was checked' message
        setTimeout(() => this.showDialogs());
        this.updateData();

        this.searchControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH),
            switchMap(name => this.channelService.getChannelCategories(ChannelMap.amazon, {name})),
        )
            .subscribe(response => this.channelCategoryOptions = response._embedded.category);
    }

    pageChanged(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.updateData();
    }

    protected showDialogs() {
        this.matDialog.open(AmazonAccountDialogComponent, {disableClose: true})
            .afterClosed()
            .subscribe(() => this.matDialog.open(WelcomeInstructionsComponent, {disableClose: true}));
    }

    protected updateData() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }


        this.subscription = this.channelService.getChannelCategories(ChannelMap.amazon, {
            page: (this.currentPage + 1).toString(),
            limit: this.itemsPerPage
        }).subscribe(categories => {
            this.categories = categories._embedded.category;
            this.totalCategoriesNumber = categories.total;
        });
    }

}
