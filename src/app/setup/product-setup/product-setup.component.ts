import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { zip } from 'rxjs';
import { ConfigurationState } from '../configuration-state';
import { MatDialog } from '@angular/material/dialog';
import { FeedService } from '../../core/services/feed.service';
import { ActivatedRoute } from '@angular/router';
import { AutotagFormStateService } from '../shared/autotag-mapping/autotag-form-state.service';
import { Title } from '@angular/platform-browser';
import { OverlayActiveService } from '../feed-setup/overlay-active.service';
import { CategoryMappingComponent } from '../shared/category-mapping/category-mapping.component';
import { Channel } from 'sfl-shared/entities';
import { Feed } from '../../core/entities/feed';
import { AutotagFormState } from '../shared/autotag-mapping/autotag-form-state.enum';
import { CategoryMappingService } from '../shared/category-mapping.service';
import { ProductCategoryMappingService } from './product-category-mapping.service';
import { ProductsListComponent } from './products-list/products-list.component';
import { AutotagService } from '../shared/autotag-mapping/autotag-service';
import { ProductAutotagService } from './product-autotag.service';
import { FullstoryLoaderService } from '../../core/services/fullstory-loader.service';
import { UnsavedDataDialogComponent } from 'sfl-tools/unsaved-data-guard';

@Component({
    selector: 'sf-product-setup',
    templateUrl: './product-setup.component.html',
    styleUrls: ['./product-setup.component.scss'],
    providers: [
        {provide: CategoryMappingService, useClass: ProductCategoryMappingService},
        {provide: AutotagService, useClass: ProductAutotagService},
    ],
})
export class ProductSetupComponent implements OnInit {

    @ViewChild(ProductsListComponent, {static: true}) productsList: ProductsListComponent;
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
                private changeDetectorRef: ChangeDetectorRef,
                private fullstoryLoader: FullstoryLoaderService,) {
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

            this.titleService.setTitle(`Shoppingfeed / ${this.channel.name} / Product Setup`);
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
            this.feedService.fetchProductCollection(this.feed.id, {state: ConfigurationState.Configured, limit: '1'}),
            this.feedService.fetchProductCollection(this.feed.id, {limit: '1'}),
        )
            .subscribe(([mapped, {total}]) => {
                this.percentage = total ? mapped.total / total : 0;
            })
    }

    showCloseDialog() {
        return this.matDialog.open(UnsavedDataDialogComponent).afterClosed();
    }
}
