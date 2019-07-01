import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesConfigurationComponent } from './categories-configuration.component';
import { Directive, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatAutocompleteModule, MatDialog } from '@angular/material';
import { ChannelService } from '../../core/services/channel.service';
import { FeedService } from '../../core/services/feed.service';
import { EMPTY, of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoryMapping } from '../category-mapping';
import { UnsavedDataDialogComponent } from './unsaved-data-dialog/unsaved-data-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { FeedCategoriesListComponent } from './feed-categories-list/feed-categories-list.component';

describe('CategoriesConfigurationComponent', () => {
    let component: CategoriesConfigurationComponent;
    let fixture: ComponentFixture<CategoriesConfigurationComponent>;

    @Directive({selector: '[sfLegacyLink]'})
    class LegacyLinkMockDirective {
    }

    @Pipe({name: 'sfChannelLink'})
    class ChannelLinkMockPipe implements PipeTransform {
        transform() {
        }
    }

    let matDialog: jasmine.SpyObj<MatDialog>;
    let channelService: jasmine.SpyObj<ChannelService>;
    let feedService: jasmine.SpyObj<FeedService>;
    let route: jasmine.SpyObj<{ data: Subject<any> }>;
    let store: jasmine.SpyObj<Store<AppState>>;
    let feedCategoriesList: FeedCategoriesListComponent;

    beforeEach(async(() => {
        matDialog = jasmine.createSpyObj(['open']);
        channelService = jasmine.createSpyObj('ChannelService', ['getChannelCategories']);
        feedService = jasmine.createSpyObj('FeedService', ['fetchFeedCollection', 'fetchCategoryCollection']);
        route = {data: new Subject()};
        store = jasmine.createSpyObj('Store spy', ['select']);
        TestBed.configureTestingModule({
            declarations: [CategoriesConfigurationComponent, LegacyLinkMockDirective, ChannelLinkMockPipe],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatAutocompleteModule],
            providers: [
                {provide: MatDialog, useValue: matDialog},
                {provide: ChannelService, useValue: channelService},
                {provide: FeedService, useValue: feedService},
                {provide: ActivatedRoute, useValue: route},
                {provide: Store, useValue: store},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoriesConfigurationComponent);
        component = fixture.componentInstance;
        component.feedCategoriesList = <any>{
            currentPage: 0,
            itemsPerPage: '10',
        }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set a correct percentage of mapped categories', () => {
        feedService.fetchCategoryCollection.and.callFake((feedId, filters) => {
            return filters.mapping === CategoryMapping.Mapped
                ? of(<any>{_embedded: {}, total: 1})
                : of(<any>{_embedded: {category: []}, total: 9})
        });
        route.data.next({data: {channel: {}, feed: {}}});
        expect(component.percentage).toBe(0.1);
    });

    it('should update data when a user filters categories by mapping', () => {
        feedService.fetchCategoryCollection.and.returnValue(EMPTY);
        matDialog.open.and.returnValue(<any>{afterClosed: () => of(CategoryMapping.Mapped)});
        component.feed = <any>{id: 15};
        component.openFilterDialog();
        expect(feedService.fetchCategoryCollection).toHaveBeenCalledWith(15, {
            page: '1',
            limit: component.feedCategoriesList.itemsPerPage,
            name: null,
            mapping: CategoryMapping.Mapped,
        })
    });

    it('should update data and set a page when a page is changed on paginator', () => {
        feedService.fetchCategoryCollection.and.returnValue(EMPTY);
        component.feed = <any>{id: 15};
        component.feedCategoriesList.currentPage = 2;
        component.refreshCategoriesList();
        expect(feedService.fetchCategoryCollection).toHaveBeenCalledWith(15, {
            page: '3',
            limit: component.feedCategoriesList.itemsPerPage,
            name: null,
            mapping: undefined,
        })
    });

    // it('should reset matching on resetMathing() call', () => {
    //     component.searchChannelCategoryControl.setValue('some text');
    //     component.chosenChannelCategory = <any>'some value';
    //     component.resetMatching();
    //     expect(component.searchChannelCategoryControl.value).toBe(null);
    //     expect(component.chosenChannelCategory).not.toBeDefined();
    // });

    it('should open an unsaved data dialog on showCloseDialog() call', () => {
        component.showCloseDialog();
        expect(matDialog.open).toHaveBeenCalledWith(UnsavedDataDialogComponent);
    });
    //
    // it('should be marked as having modifications if searchChannelCategoryControl has a value', () => {
    //     component.searchChannelCategoryControl.setValue('some value');
    //     expect(component.hasModifications()).toBe(true);
    // });

    // it('should be marked as NOT having modifications if if only a channel category chosen', () => {
    //     component.chosenChannelCategory = <any>{};
    //     expect(component.hasModifications()).toBe(false);
    // });
});
