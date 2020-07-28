import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCategoriesListComponent } from './feed-categories-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FeedService } from '../../../core/services/feed.service';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, of, Subject } from 'rxjs';
import { ConfigurationState } from '../../configuration-state';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryMappingService } from '../../shared/category-mapping.service';

describe('FeedCategoriesListComponent', () => {
    let component: FeedCategoriesListComponent;
    let fixture: ComponentFixture<FeedCategoriesListComponent>;

    let matDialog: jasmine.SpyObj<MatDialog>;
    let feedService: jasmine.SpyObj<FeedService>;
    let route: jasmine.SpyObj<{ data: Subject<any> }>;
    let categoryMappingService: jasmine.SpyObj<CategoryMappingService>;

    beforeEach(async(() => {

        matDialog = jasmine.createSpyObj(['open']);
        feedService = jasmine.createSpyObj('FeedService', ['fetchFeedCollection', 'fetchCategoryCollection']);
        route = {data: new Subject()};
        categoryMappingService = jasmine.createSpyObj(['setCurrentMapping', 'getChanges']);

        TestBed.configureTestingModule({
            declarations: [FeedCategoriesListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialog, useValue: matDialog},
                {provide: FeedService, useValue: feedService},
                {provide: ActivatedRoute, useValue: route},
                {provide: CategoryMappingService, useValue: categoryMappingService},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedCategoriesListComponent);
        component = fixture.componentInstance;
        component.listContainer = <any>{scrollTo: jasmine.createSpy()};
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit page change when a page is changed on paginator', () => {
        feedService.fetchCategoryCollection.and.returnValue(EMPTY);
        component.pageChanged(<any>{pageIndex: 2});
        expect(feedService.fetchCategoryCollection.calls.mostRecent().args[1].page).toBe('3');
    });

    it('should set a page to 1 when the `items per page` is changed on paginator', () => {
        feedService.fetchCategoryCollection.and.returnValue(EMPTY);
        component.currentPage = 200;
        component.pageChanged(<any>{pageSize: 100, pageIndex: 21, previousPageIndex: 21});
        expect(component.currentPage).toBe(0);
    });

    it('should select the next category when chooseNextClientCategory() called', () => {
        component.dataSource = new MatTableDataSource(<any>[{id: 1}, {id: 2}]);
        component.chooseListItem(component.dataSource.data[0]);
        component.chooseNextListItem();
        expect(component.chosenListItem.id).toBe(2);
    });

    it('should load next page when chooseNextClientCategory() called and the last category selected', () => {
        feedService.fetchCategoryCollection.and.returnValue(EMPTY);
        component.dataSource = new MatTableDataSource(<any>[{id: 1}, {id: 2}]);
        component.resultsLength = 100;
        component.chooseListItem(component.dataSource.data[1]);
        component.chooseNextListItem();
        expect(feedService.fetchCategoryCollection.calls.mostRecent().args[1].page).toBe('2');
    });

    it('should NOT load next page when chooseNextClientCategory() called and the last category on the last page selected', () => {
        feedService.fetchCategoryCollection.and.returnValue(EMPTY);
        component.dataSource = new MatTableDataSource([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (<any>{id: item, channelCategory: {}})));
        component.currentPage = 4; // last page
        component.pageSize = 10;
        component.resultsLength = 50;
        component.chooseListItem(component.dataSource.data[9]);
        component.chooseNextListItem();
        expect(feedService.fetchCategoryCollection).not.toHaveBeenCalled();
    });

    it('should update data when a user filters categories by mapping', () => {
        feedService.fetchCategoryCollection.and.returnValue(EMPTY);
        matDialog.open.and.returnValue(<any>{afterClosed: () => of(ConfigurationState.Configured)});
        component.feedId = 15;
        component.openFilterDialog();
        expect(feedService.fetchCategoryCollection).toHaveBeenCalledWith(15, {
            page: '1',
            limit: component.pageSize.toString(),
            name: '',
            state: ConfigurationState.Configured,
        })
    });

    it('should update data and set a page when a page is changed on paginator', () => {
        feedService.fetchCategoryCollection.and.returnValue(EMPTY);
        component.feedId = 15;
        component.currentPage = 2;
        component.updateData();
        expect(feedService.fetchCategoryCollection).toHaveBeenCalledWith(15, {
            page: '3',
            limit: component.pageSize.toString(),
            name: '',
            state: undefined,
        })
    });

    it('should scroll to the top of the list when a page is changed', () => {
        feedService.fetchCategoryCollection.and.returnValue(EMPTY);
        component.feedId = 15;
        component.currentPage = 2;
        component.pageChanged(<any>{pageIndex: 2})
        expect(component.listContainer.scrollTo).toHaveBeenCalledWith({top: 0});
    });

});
