import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { zip } from 'rxjs';
import { FeedService } from '../../core/services/feed.service';
import { Channel } from 'sfl-shared/entities';
import { ActivatedRoute } from '@angular/router';
import { CategoryState } from '../category-state';
import { Feed } from '../../core/entities/feed';
import { FeedCategoriesListComponent } from './feed-categories-list/feed-categories-list.component';
import { CategoryMappingComponent } from './category-mapping/category-mapping.component';
import { AutotagFormStateService } from './autotag-mapping/autotag-form-state.service';
import { AutotagFormState } from './autotag-mapping/autotag-form-state.enum';
import { FullstoryLoaderService } from '../../core/services/fullstory-loader.service';
import { UnsavedDataDialogComponent, UnsavedDataInterface } from 'sfl-tools/unsaved-data-guard';
import { Title } from '@angular/platform-browser';


@Component({
    templateUrl: './categories-configuration.component.html',
    styleUrls: ['./categories-configuration.component.scss']
})
export class CategoriesConfigurationComponent implements OnInit, UnsavedDataInterface {

    @ViewChild(FeedCategoriesListComponent, {static: true}) feedCategoriesList: FeedCategoriesListComponent;
    @ViewChild(CategoryMappingComponent) categoryMapping: CategoryMappingComponent;

    channel: Channel;
    feed: Feed;

    /** percentage of matched categories */
    percentage = 0;

    autotagFormState: AutotagFormState;
    catalogCategoryState = CategoryState;

    constructor(protected matDialog: MatDialog,
                protected feedService: FeedService,
                protected route: ActivatedRoute,
                protected stateService: AutotagFormStateService,
                protected fullstoryLoader: FullstoryLoaderService,
                protected titleService: Title) {
    }


    @HostListener('window:beforeunload', ['$event'])
    handleBeforeUnload() {
        if (this.hasModifications()) {
            return confirm('Unsaved data can be lost, continue?');
        }
    }

    hasModifications() {
        return this.categoryMapping.searchChannelCategoryControl.dirty || this.autotagFormState === AutotagFormState.dirty;
    }

    ngOnInit() {
        this.fullstoryLoader.load();
        this.route.data.subscribe(({data}) => {
            this.channel = data.channel;
            this.feed = data.feed;

            this.titleService.setTitle(`Shoppingfeed / ${this.channel.name} / Setup`);
        });
        this.stateService.getState().subscribe(state => this.autotagFormState = state);
    }

    onAutotagsLoaded() {
        this.categoryMapping.loading = false
    }

    refreshPercentage() {
        zip(
            this.feedService.fetchCategoryCollection(this.feed.id, {state: CategoryState.Configured, limit: '1'}),
            this.feedService.fetchCategoryCollection(this.feed.id, {limit: '1'}),
        )
            .subscribe(([mapped, {total}]) => {
                this.percentage = total ? mapped.total / total : 0;
            })
    }

    showCloseDialog() {
        return this.matDialog.open(UnsavedDataDialogComponent).afterClosed();
    }

}
