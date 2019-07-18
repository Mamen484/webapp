import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CategoryMappingComponent } from './category-mapping.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule, MatSnackBar } from '@angular/material';
import { ChannelService } from '../../../core/services/channel.service';
import { FeedService } from '../../../core/services/feed.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { EMPTY, of } from 'rxjs';
import { CategoryMappingService } from './category-mapping.service';

describe('CategoryMappingComponent', () => {
    let component: CategoryMappingComponent;
    let fixture: ComponentFixture<CategoryMappingComponent>;

    let channelService: jasmine.SpyObj<ChannelService>;
    let feedService: jasmine.SpyObj<FeedService>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let matSnackBar: jasmine.SpyObj<MatSnackBar>;
    let categoryMappingService: jasmine.SpyObj<CategoryMappingService>;

    beforeEach(async(() => {

        channelService = jasmine.createSpyObj('ChannelService spy', ['getChannelCategories']);
        feedService = jasmine.createSpyObj('FeedService spy', ['mapFeedCategory']);
        appStore = jasmine.createSpyObj('App Store spy', ['select']);
        matSnackBar = jasmine.createSpyObj('MatSnackBar spy', ['openFromComponent']);
        categoryMappingService = jasmine.createSpyObj('CategoryMappingService spy', ['notifyMappingChange']);


        TestBed.configureTestingModule({
            declarations: [CategoryMappingComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatAutocompleteModule],
            providers: [
                {provide: ChannelService, useValue: channelService},
                {provide: FeedService, useValue: feedService},
                {provide: Store, useValue: appStore},
                {provide: MatSnackBar, useValue: matSnackBar},
                {provide: CategoryMappingService, useValue: categoryMappingService},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryMappingComponent);
        component = fixture.componentInstance;
        component.feedCategory = <any>{feedId: 21, catalogCategory: {id: 14}};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get category suggestions when user types a category name', fakeAsync(() => {
        appStore.select.and.returnValue(of({country: 'fr'}));
        channelService.getChannelCategories.and.returnValue(of(<any>{_embedded: {category: [83, 70, 72, 50]}}));

        component.searchChannelCategoryControl.setValue('1234');
        tick(300);
        expect(component.channelCategoryOptions).toEqual(<any>[83, 70, 72, 50]);
    }));

    it('should emit categoryMappingChanged event when a category is saved successfully', async () => {
        component.chosenChannelCategory = <any>{id: 22};
        feedService.mapFeedCategory.and.returnValue(of({}));
        component.saveMatching();
        expect(categoryMappingService.notifyMappingChange).toHaveBeenCalledWith({id: 22});
    });

    it('should show a snackbar when a category is saved successfully', async () => {
        component.chosenChannelCategory = <any>{id: 22};
        feedService.mapFeedCategory.and.returnValue(of({}));
        component.saveMatching();
        expect(matSnackBar.openFromComponent).toHaveBeenCalled();
    });

    it('should show a loading bar when a category mapping save clicked', async () => {
        component.chosenChannelCategory = <any>{id: 22};
        feedService.mapFeedCategory.and.returnValue(EMPTY);
        component.saveMatching();
        expect(component.loading).toBe(true);
    });

    it('should send a channel category id to modify a category mapping when a mapping created', () => {
        component.chosenChannelCategory = <any>{id: 44};
        feedService.mapFeedCategory.and.returnValue(EMPTY);
        component.saveMatching();
        expect(feedService.mapFeedCategory).toHaveBeenCalledWith(21, 14, 44);
    });

    it('should send NULL to remove a category mapping when a mapping input value removed', () => {
        component.chosenChannelCategory = null;
        feedService.mapFeedCategory.and.returnValue(EMPTY);
        component.saveMatching();
        expect(feedService.mapFeedCategory).toHaveBeenCalledWith(21, 14, null);
    });

    it('should mark the category control as valid when no category selected and the input does not contain any value', () => {
        component.chosenChannelCategory = null;
        component.searchChannelCategoryControl.setValue('');
        fixture.detectChanges();
        expect(component.searchChannelCategoryControl.valid).toBe(true);
    });

    it('should mark the category control as INvalid when no category selected but the input contains a value', () => {
        component.chosenChannelCategory = null;
        component.searchChannelCategoryControl.setValue({name: '432'});
        fixture.detectChanges();
        expect(component.searchChannelCategoryControl.valid).toBe(false);
    });

    it('should mark the category control as valid when a category is selected from a list and the input value equals it\'s name', () => {
        component.chosenChannelCategory = <any>{name: '432'};
        component.searchChannelCategoryControl.setValue({name: '432'});
        fixture.detectChanges();
        expect(component.searchChannelCategoryControl.valid).toBe(true);
    });

    it('should mark the category control as INvalid when a category is selected from a list and the input value DOES NOT equal it`s name', () => {
        component.chosenChannelCategory = <any>{name: '432'};
        component.searchChannelCategoryControl.setValue({name: '515'});
        fixture.detectChanges();
        expect(component.searchChannelCategoryControl.valid).toBe(false);
    });

    it('should load all pages of channel categories response when categories list csv downloaded', () => {
        channelService.getChannelCategories.and.returnValue(<any>of({pages: 5, _embedded: {category: []}}));
        component.getCategoriesList().subscribe();
        expect(channelService.getChannelCategories).toHaveBeenCalledTimes(5);
        expect(channelService.getChannelCategories.calls.allArgs().map(arg => arg[1].page)).toEqual(['1', '2', '3', '4', '5']);
    });

    it('should load one page of channel categories response when categories list csv downloaded and the response contains only one page', () => {
        channelService.getChannelCategories.and.returnValue(<any>of({pages: 1, _embedded: {category: []}}));
        component.getCategoriesList().subscribe();
        expect(channelService.getChannelCategories).toHaveBeenCalledTimes(1);
        expect(channelService.getChannelCategories.calls.allArgs().map(arg => arg[1].page)).toEqual(['1']);
    });

    it('should create a proper list of categories for csv when multiple pages exist', async () => {
        channelService.getChannelCategories.and.returnValues(
            <any>of({pages: 3, _embedded: {category: [{name: '1'}, {name: '2'}]}}),
            <any>of({pages: 3, _embedded: {category: [{name: '3'}, {name: '4'}]}}),
            <any>of({pages: 3, _embedded: {category: [{name: '5'}, {name: '6'}]}}),
        );
        const categories = await component.getCategoriesList().toPromise();
        expect(categories).toEqual([
            {name: '1'},
            {name: '2'},
            {name: '3'},
            {name: '4'},
            {name: '5'},
            {name: '6'},
        ]);

    });

    it('should create a proper list of categories for csv when one page exist', async () => {
        channelService.getChannelCategories.and.returnValue(
            <any>of({pages: 1, _embedded: {category: [{name: '1'}, {name: '2'}]}}),
        );
        const categories = await component.getCategoriesList().toPromise();
        expect(categories).toEqual([
            {name: '1'},
            {name: '2'},
        ]);

    });
});
