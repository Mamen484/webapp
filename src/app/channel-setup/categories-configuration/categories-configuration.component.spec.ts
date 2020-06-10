import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesConfigurationComponent } from './categories-configuration.component';
import { Directive, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from '../../core/services/channel.service';
import { FeedService } from '../../core/services/feed.service';
import { of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoryState } from '../category-state';
import { AutotagFormState } from './autotag-mapping/autotag-form-state.enum';
import { FullstoryLoaderService } from '../../core/services/fullstory-loader.service';
import { UnsavedDataDialogComponent } from 'sfl-tools/unsaved-data-guard';
import { Title } from '@angular/platform-browser';

describe('CategoriesConfigurationComponent', () => {
    let component: CategoriesConfigurationComponent;
    let fixture: ComponentFixture<CategoriesConfigurationComponent>;
    let titleService: jasmine.SpyObj<Title>;

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
    let fullstoryLoaderService: jasmine.SpyObj<FullstoryLoaderService>;

    beforeEach(async(() => {
        matDialog = jasmine.createSpyObj(['open']);
        channelService = jasmine.createSpyObj('ChannelService', ['getChannelCategories']);
        feedService = jasmine.createSpyObj('FeedService', ['fetchFeedCollection', 'fetchCategoryCollection']);
        route = {data: new Subject()};
        fullstoryLoaderService = jasmine.createSpyObj('FullstoryLoaderService spy', ['load']);
        titleService = jasmine.createSpyObj('Title', ['setTitle']);

        TestBed.configureTestingModule({
            declarations: [CategoriesConfigurationComponent, LegacyLinkMockDirective, ChannelLinkMockPipe],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatAutocompleteModule],
            providers: [
                {provide: MatDialog, useValue: matDialog},
                {provide: ChannelService, useValue: channelService},
                {provide: FeedService, useValue: feedService},
                {provide: ActivatedRoute, useValue: route},
                {provide: FullstoryLoaderService, useValue: fullstoryLoaderService},
                {provide: Title, useValue: titleService},

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
        };
        component.feed = <any>{id: 12};
        component.channel = <any>{name: 'Trararam'};
        component.categoryMapping = <any>{searchChannelCategoryControl: <any>{}};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the page title', () => {
        route.data.next({data: {feed: {}, channel: {name: 'Trararam'}}});
        expect(titleService.setTitle).toHaveBeenCalledWith('Shoppingfeed / Trararam / Setup');
    });

    it('should set a correct percentage of mapped categories', () => {
        feedService.fetchCategoryCollection.and.callFake((feedId, filters) => {
            return filters.state === CategoryState.Configured
                ? of(<any>{_embedded: {}, total: 1})
                : of(<any>{_embedded: {category: []}, total: 10})
        });
        component.refreshPercentage();
        expect(component.percentage).toBe(0.1);
    });

    it('should open an unsaved data dialog on showCloseDialog() call', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => (of(true))});
        component.showCloseDialog();
        expect(matDialog.open).toHaveBeenCalledWith(UnsavedDataDialogComponent);
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
        component.ngOnInit();
        expect(fullstoryLoaderService.load).toHaveBeenCalled();
    });
});
