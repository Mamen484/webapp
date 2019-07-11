import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CategoryMappingComponent } from './category-mapping.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule, MatSnackBar } from '@angular/material';
import { ChannelService } from '../../../core/services/channel.service';
import { FeedService } from '../../../core/services/feed.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { EMPTY, of } from 'rxjs';
import { take } from 'rxjs/operators';

describe('CategoryMappingComponent', () => {
    let component: CategoryMappingComponent;
    let fixture: ComponentFixture<CategoryMappingComponent>;

    let channelService: jasmine.SpyObj<ChannelService>;
    let feedService: jasmine.SpyObj<FeedService>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let matSnackBar: jasmine.SpyObj<MatSnackBar>;

    beforeEach(async(() => {

        channelService = jasmine.createSpyObj('ChannelService spy', ['getChannelCategories']);
        feedService = jasmine.createSpyObj('FeedService spy', ['mapFeedCategory']);
        appStore = jasmine.createSpyObj('App Store spy', ['select']);
        matSnackBar = jasmine.createSpyObj('MatSnackBar spy', ['openFromComponent']);
        TestBed.configureTestingModule({
            declarations: [CategoryMappingComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatAutocompleteModule],
            providers: [
                {provide: ChannelService, useValue: channelService},
                {provide: FeedService, useValue: feedService},
                {provide: Store, useValue: appStore},
                {provide: MatSnackBar, useValue: matSnackBar},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryMappingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should reset matching on resetMatching() call', () => {
        component.searchChannelCategoryControl.setValue('some text');
        component.chosenChannelCategory = <any>'some value';
        component.resetMatching();
        expect(component.searchChannelCategoryControl.value).toBe(null);
        expect(component.chosenChannelCategory).not.toBeDefined();
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
        const mappingChanged$ = component.categoryMappingChanged.pipe(take(1)).toPromise();
        feedService.mapFeedCategory.and.returnValue(of({}));
        component.saveMatching();
        const returned = await mappingChanged$;
        expect(returned).toEqual({id: 22});
    });

    it('should emit categoryMappingChanged event when a category is saved successfully', async () => {
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
});
