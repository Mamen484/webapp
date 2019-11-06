import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesConfigurationComponent } from './categories-configuration.component';
import { Directive, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatAutocompleteModule, MatDialog } from '@angular/material';
import { ChannelService } from '../../core/services/channel.service';
import { FeedService } from '../../core/services/feed.service';
import { EMPTY, of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoryState } from '../category-state';
import { UnsavedDataDialogComponent } from './unsaved-data-dialog/unsaved-data-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { AutotagFormState } from './autotag-mapping/autotag-form-state.enum';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { FullstoryLoaderService } from '../../core/services/fullstory-loader.service';

describe('CategoriesConfigurationComponent', () => {
    let component: CategoriesConfigurationComponent;
    let fixture: ComponentFixture<CategoriesConfigurationComponent>;
    let userService: jasmine.SpyObj<SflUserService>;
    let windowRef = <any>{};

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
    let fullstoryLoaderService: jasmine.SpyObj<FullstoryLoaderService>;

    beforeEach(async(() => {
        windowRef.nativeWindow = {FS: {identify: jasmine.createSpy()}};
        matDialog = jasmine.createSpyObj(['open']);
        channelService = jasmine.createSpyObj('ChannelService', ['getChannelCategories']);
        feedService = jasmine.createSpyObj('FeedService', ['fetchFeedCollection', 'fetchCategoryCollection']);
        route = {data: new Subject()};
        store = jasmine.createSpyObj('Store spy', ['select']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        fullstoryLoaderService = jasmine.createSpyObj('FullstoryLoaderService spy', ['load']);

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
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: SflUserService, useValue: userService},
                {provide: FullstoryLoaderService, useValue: fullstoryLoaderService},

            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        store.select.and.returnValue(EMPTY);
        fixture = TestBed.createComponent(CategoriesConfigurationComponent);
        component = fixture.componentInstance;
        component.feedCategoriesList = <any>{
            currentPage: 0,
            itemsPerPage: '10',
        };
        component.feed = <any>{id: 12};
        component.channel = <any>{};
        component.categoryMapping = <any>{searchChannelCategoryControl: <any>{}};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set a correct percentage of mapped categories', () => {
        feedService.fetchCategoryCollection.and.callFake((feedId, filters) => {
            return filters.state === CategoryState.Configured
                ? of(<any>{_embedded: {}, total: 1})
                : of(<any>{_embedded: {category: []}, total: 10})
        });
        route.data.next({data: {channel: {}, feed: {}}});
        expect(component.percentage).toBe(0.1);
    });

    it('should update data when a user filters categories by mapping', () => {
        feedService.fetchCategoryCollection.and.returnValue(EMPTY);
        matDialog.open.and.returnValue(<any>{afterClosed: () => of(CategoryState.Configured)});
        component.feed = <any>{id: 15};
        component.openFilterDialog();
        expect(feedService.fetchCategoryCollection).toHaveBeenCalledWith(15, {
            page: '1',
            limit: component.feedCategoriesList.itemsPerPage,
            name: null,
            state: CategoryState.Configured,
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
            state: undefined,
        })
    });

    it('should open an unsaved data dialog on showCloseDialog() call', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => (of(true))});
        component.showCloseDialog();
        expect(matDialog.open).toHaveBeenCalledWith(UnsavedDataDialogComponent);
    });

    it('should open an unsaved data dialog only once if user agreed to leave the page (prevent multiple dialog show on several canDeactivate() calls)', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => (of(true))});
        component.showCloseDialog().subscribe();
        component.showCloseDialog().subscribe();
        expect(matDialog.open).toHaveBeenCalledTimes(1);
    });

    it('should open an unsaved data dialog twice if user declined to leave the page, but then navigated from the page one more time', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => (of(false))});
        component.showCloseDialog().subscribe();
        component.showCloseDialog().subscribe();
        expect(matDialog.open).toHaveBeenCalledTimes(2);
    });

    it('should be marked as having modifications if categoryMapping.searchChannelCategoryControl is dirty', () => {
        component.categoryMapping = <any>{searchChannelCategoryControl: {dirty: true}};
        component.autotagFormState = AutotagFormState.pristine;
        expect(component.hasModifications()).toBe(true);
    });

    it('should be marked as having modifications if autotagFormState is dirty', () => {
        component.categoryMapping = <any>{searchChannelCategoryControl: {dirty: false}};
        component.autotagFormState = AutotagFormState.dirty;
        expect(component.hasModifications()).toBe(true);
    });

    it('should be marked as NOT having modifications categoryMapping.searchChannelCategoryControl is pristine and autotagFormState is pristine', () => {
        component.categoryMapping = <any>{searchChannelCategoryControl: {dirty: false}};
        component.autotagFormState = AutotagFormState.pristine;
        expect(component.hasModifications()).toBe(false);
    });

    it('should run fullstory code', () => {
        store.select.and.returnValue(of({
            id: 'some_id',
            name: 'some_name',
            permission: {}
        }));
        userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({
            roles: ['user'],
            token: 'token_1',
            email: 'some_email'
        })));
        component.ngOnInit();
        expect(fullstoryLoaderService.load).toHaveBeenCalled();
    });
});
