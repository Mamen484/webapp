import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCategoriesListComponent } from './feed-categories-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FeedCategoriesListComponent', () => {
    let component: FeedCategoriesListComponent;
    let fixture: ComponentFixture<FeedCategoriesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FeedCategoriesListComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedCategoriesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit page change when a page is changed on paginator', () => {
        let spy = spyOn(component.pageChanged, 'emit');
        component.changePage(<any>{pageIndex: 2});
        expect(spy).toHaveBeenCalled();
    });

    it('should set a page to 1 when the `items per page` is changed on paginator', () => {
        component.currentPage = 200;
        component.changePage(<any>{pageSize: 100, pageIndex: 21, previousPageIndex: 21});
        expect(component.currentPage).toBe(0);
    });
});
