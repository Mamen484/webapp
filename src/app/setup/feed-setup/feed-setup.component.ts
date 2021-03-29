import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { zip } from 'rxjs';
import { FeedService } from '../../core/services/feed.service';
import { Channel } from 'sfl-shared/entities';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationState } from '../configuration-state';
import { Feed } from '../../core/entities/feed';
import { FeedCategoriesListComponent } from './feed-categories-list/feed-categories-list.component';
import { CategoryMappingComponent } from '../shared/category-mapping/category-mapping.component';
import { AutotagFormStateService } from '../shared/autotag-mapping/autotag-form-state.service';
import { AutotagFormState } from '../shared/autotag-mapping/autotag-form-state.enum';
import { UnsavedDataDialogComponent, UnsavedDataInterface } from 'sfl-tools/src/lib/unsaved-data-guard';
import { OverlayActiveService } from './overlay-active.service';
import { Title } from '@angular/platform-browser';
import { CategoryMappingService } from '../shared/category-mapping.service';
import { FeedCategoryMappingService } from './feed-category-mapping.service';
import { CategoryAutotagService } from './category-autotag.service';
import { AutotagService } from '../shared/autotag-mapping/autotag-service';


@Component({
    templateUrl: './feed-setup.component.html',
    styleUrls: ['./feed-setup.component.scss'],
    providers: [
        {provide: CategoryMappingService, useClass: FeedCategoryMappingService},
        {provide: AutotagService, useClass: CategoryAutotagService},
    ]
})
export class FeedSetupComponent implements OnInit, UnsavedDataInterface {

    @ViewChild(FeedCategoriesListComponent, {static: true}) feedCategoriesList: FeedCategoriesListComponent;
    @ViewChild(CategoryMappingComponent) categoryMapping: CategoryMappingComponent;

    channel: Channel;
    feed: Feed;

    /** percentage of matched categories */
    percentage = 0;

    autotagFormState: AutotagFormState;
    catalogCategoryState = ConfigurationState;
    overlayActive = false;

    constructor(protected matDialog: MatDialog,
                protected feedService: FeedService,
                protected route: ActivatedRoute,
                protected stateService: AutotagFormStateService,
                protected titleService: Title,
                private overlayActiveService: OverlayActiveService,
                private changeDetectorRef: ChangeDetectorRef) {
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
        this.route.data.subscribe(({data}) => {
            this.channel = data.channel;
            this.feed = data.feed;

            this.titleService.setTitle(`Shoppingfeed / ${this.channel.name} / Setup`);
        });
        this.stateService.getState().subscribe(state => this.autotagFormState = state);
        this.overlayActiveService.isActive().subscribe(isActive => {
            this.overlayActive = isActive;
            // prevent scroll locking after asynchronous overlay deactivation
            this.changeDetectorRef.detectChanges();
        });
    }

    refreshPercentage() {
        zip(
            this.feedService.fetchCategoryCollection(this.feed.id, {state: ConfigurationState.Configured, limit: '1'}),
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
