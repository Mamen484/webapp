import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CategoryMappingComponent } from './category-mapping.component';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChannelService } from '../../../core/services/channel.service';
import { FeedService } from '../../../core/services/feed.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { EMPTY, of, Subject } from 'rxjs';
import { CategoryMappingService, Mapping } from './category-mapping.service';
import { MappingCacheService } from '../mapping-cache.service';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CategoryMappingComponent', () => {
    let component: CategoryMappingComponent;
    let fixture: ComponentFixture<CategoryMappingComponent>;

    let channelService: jasmine.SpyObj<ChannelService>;
    let feedService: jasmine.SpyObj<FeedService>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let matSnackBar: jasmine.SpyObj<MatSnackBar>;
    let mappingCacheService: jasmine.SpyObj<MappingCacheService>;
    let categoryMappingService: jasmine.SpyObj<CategoryMappingService>;
    let categoryMapping$: Subject<{
        fromCache: boolean,
        mapping: Mapping
    }>;

    beforeEach(async(() => {

        channelService = jasmine.createSpyObj('ChannelService spy', ['getChannelCategories']);
        feedService = jasmine.createSpyObj('FeedService spy', ['mapFeedCategory']);
        appStore = jasmine.createSpyObj('App Store spy', ['select']);
        matSnackBar = jasmine.createSpyObj('MatSnackBar spy', ['openFromComponent']);
        categoryMappingService = jasmine.createSpyObj('CategoryMappingService spy', ['saveNewMapping', 'getCurrentMapping']);
        mappingCacheService = jasmine.createSpyObj('MappingCacheService spy', ['getCategoryMapping', 'addCategoryMapping', 'hasCategoryMapping']);
        categoryMapping$ = new Subject();
        categoryMappingService.getCurrentMapping.and.returnValue(categoryMapping$);
        TestBed.configureTestingModule({
            declarations: [CategoryMappingComponent, HighlightPipe],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatAutocompleteModule, FormsModule, ReactiveFormsModule, MatInputModule, NoopAnimationsModule],
            providers: [
                {provide: ChannelService, useValue: channelService},
                {provide: FeedService, useValue: feedService},
                {provide: Store, useValue: appStore},
                {provide: MatSnackBar, useValue: matSnackBar},
                {provide: CategoryMappingService, useValue: categoryMappingService},
                {provide: MappingCacheService, useValue: mappingCacheService},
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

    it('should get category suggestions when the category name is empty', fakeAsync(() => {
        appStore.select.and.returnValue(of({country: 'fr'}));
        channelService.getChannelCategories.and.returnValue(of(<any>{_embedded: {category: [83, 70, 72, 50]}}));

        component.searchChannelCategoryControl.setValue('');
        tick(300);
        expect(component.channelCategoryOptions).toEqual(<any>[83, 70, 72, 50]);
    }));

    it('should request suggestions only once for an empty name and the first page', fakeAsync(() => {
        appStore.select.and.returnValue(of({country: 'fr'}));
        channelService.getChannelCategories.and.returnValue(EMPTY);
        component.searchChannelCategoryControl.setValue('');
        tick(300);
        component.searchChannelCategoryControl.setValue('12');
        tick(300);
        component.searchChannelCategoryControl.setValue('');
        tick(300);
        expect(channelService.getChannelCategories).toHaveBeenCalledTimes(2);

    }));

    it('should reset the current page when user types a category name', fakeAsync(() => {
        component.currentPage = 5;
        appStore.select.and.returnValue(of({country: 'fr'}));
        channelService.getChannelCategories.and.returnValue(of(<any>{page: 1, pages: 5, _embedded: {category: [83, 70, 72, 50]}}));

        component.searchChannelCategoryControl.setValue('1234');
        tick(300);
        expect(component.currentPage).toBe(1);
    }));

    it('should set hasNextPage to true when more pages available', fakeAsync(() => {
        component.currentPage = 1;
        appStore.select.and.returnValue(of({country: 'fr'}));
        channelService.getChannelCategories.and.returnValue(of(<any>{page: 1, pages: 2, _embedded: {category: [83, 70, 72, 50]}}));

        component.searchChannelCategoryControl.setValue('1234');
        tick(300);
        expect(component.hasNextPage).toBe(true);
    }));

    it('should set hasNextPage to false when last page loaded', fakeAsync(() => {
        component.currentPage = 1;
        appStore.select.and.returnValue(of({country: 'fr'}));
        channelService.getChannelCategories.and.returnValue(of(<any>{page: 1, pages: 1, _embedded: {category: [83, 70, 72, 50]}}));

        component.searchChannelCategoryControl.setValue('1234');
        tick(300);
        expect(component.hasNextPage).toBe(false);
    }));

    it('should show a loading bar when a category mapping save clicked', async () => {
        component.chosenChannelCategory = <any>{id: 22};
        feedService.mapFeedCategory.and.returnValue(EMPTY);
        categoryMappingService.saveNewMapping.and.returnValue(EMPTY);
        component.saveMatching();
        expect(component.loading).toBe(true);
    });

    it('should send a channel category id to modify a category mapping when a mapping created', () => {
        component.chosenChannelCategory = <any>{id: 44};
        component.feedCategory = <any>{id: 123};
        categoryMappingService.saveNewMapping.and.returnValue(EMPTY);
        component.saveMatching();
        expect(categoryMappingService.saveNewMapping).toHaveBeenCalledWith(<any>{id: 123}, <any>{id: 44});
    });

    it('should send NULL to remove a category mapping when a mapping input value removed', () => {
        component.chosenChannelCategory = null;
        component.feedCategory = <any>{id: 123};
        feedService.mapFeedCategory.and.returnValue(EMPTY);
        categoryMappingService.saveNewMapping.and.returnValue(EMPTY);
        component.saveMatching();
        expect(categoryMappingService.saveNewMapping).toHaveBeenCalledWith(<any>{id: 123}, null);
    });

    it('should mark the category control as valid when no category selected and the input does not contain any value', () => {
        appStore.select.and.returnValue(EMPTY);
        component.chosenChannelCategory = null;
        component.searchChannelCategoryControl.setValue('');
        fixture.detectChanges();
        expect(component.searchChannelCategoryControl.valid).toBe(true);
    });

    it('should mark the category control as INvalid when no category selected but the input contains a value', () => {
        appStore.select.and.returnValue(EMPTY);
        component.chosenChannelCategory = null;
        component.searchChannelCategoryControl.setValue({name: '432'});
        fixture.detectChanges();
        expect(component.searchChannelCategoryControl.valid).toBe(false);
    });

    it('should mark the category control as valid when a category is selected from a list and the input value equals it\'s name', () => {
        appStore.select.and.returnValue(EMPTY);
        component.chosenChannelCategory = <any>{name: '432'};
        component.searchChannelCategoryControl.setValue({name: '432'});
        fixture.detectChanges();
        expect(component.searchChannelCategoryControl.valid).toBe(true);
    });

    it('should mark the category control as INvalid when a category is selected from a list and the input value DOES NOT equal it`s name', () => {
        appStore.select.and.returnValue(EMPTY);
        component.chosenChannelCategory = <any>{name: '432'};
        component.searchChannelCategoryControl.setValue({name: '515'});
        fixture.detectChanges();
        expect(component.searchChannelCategoryControl.valid).toBe(false);
    });

    it('should mark the category control as INvalid when no category mapped, a category control is touched but pristine', () => {
        appStore.select.and.returnValue(EMPTY);
        component.chosenChannelCategory = null;
        fixture.detectChanges();
        component.searchChannelCategoryControl.markAsPristine();
        component.searchChannelCategoryControl.markAsTouched();
        component.searchChannelCategoryControl.updateValueAndValidity();
        expect(component.searchChannelCategoryControl.valid).toBe(false);
    });

    it('should show the error when a user focuses the input, doesn`t type anything and blurs the input', () => {
        appStore.select.and.returnValue(EMPTY);
        component.chosenChannelCategory = null;
        fixture.detectChanges();
        component.searchChannelCategoryControl.markAsPristine();
        component.searchChannelCategoryControl.markAsTouched();
        component.onBlur();
        expect(component.searchChannelCategoryControl.hasError('categoryMappingEmpty')).toBe(true);
    });

    it('should show a previous mapping option if mappingCacheService.getCategoryMapping() returns a category', () => {
        appStore.select.and.returnValue(EMPTY);
        mappingCacheService.getCategoryMapping.and.returnValue(<any>{channelCategory: {name: 'some category'}});
        categoryMapping$.next( <any>{mapping: {channelCategory: {name: 'some category'}}});
        expect(component.cachedMapping).toEqual(<any>{name: 'some category'});
    });

    describe('modifications check (for parent hasModifications() check)', () => {
        beforeEach(() => {
            appStore.select.and.returnValue(EMPTY);
            expect(component.searchChannelCategoryControl.dirty).toBe(false);
        });
        it('should be dirty when user types to a search input', fakeAsync(() => {
            setInputValue();
            tick(300);
            expect(component.searchChannelCategoryControl.dirty).toBe(true);
        }));

        it('should be dirty when user removes selection', fakeAsync(() => {
            component.removeValue();
            tick(300);
            expect(component.searchChannelCategoryControl.dirty).toBe(true);
        }));

        it('should be dirty when user saves selection and then alters search', fakeAsync(() => {
            mappingCacheService.getCategoryMapping.and.returnValue(<any>{channelCategory: {}})
            feedService.mapFeedCategory.and.returnValue(of({}));
            component.removeValue();
            tick(300);
            fixture.debugElement.nativeElement.querySelector('button.save-matching').click();
            setInputValue();
            tick(300);
            expect(component.searchChannelCategoryControl.dirty).toBe(true);
        }));

        it('should be dirty when user chooses a category from autocomplete', fakeAsync(() => {
            component.chooseCategory({id: 15, channelId: 100, name: 'some category'});
            tick(300);
            expect(component.searchChannelCategoryControl.dirty).toBe(true);
        }));

        function setInputValue() {
            const input = fixture.debugElement.query(By.css('input'));
            input.nativeElement.value = 'test text';
            input.triggerEventHandler('input', {target: input.nativeElement});
            fixture.detectChanges();
        }
    });

    describe('loadNextPage', () => {
        let event;
        beforeEach(() => {
            event = {stopPropagation: jasmine.createSpy()};
            appStore.select.and.returnValue(of(<any>{country: 'fr'}));
        });

        it('should indicate that loading is in progress', () => {
            channelService.getChannelCategories.and.returnValue(EMPTY);
            component.loadNextPage(event);
            expect(component.loadingNextPage).toBe(true);
        });

        it('should indicate that loading is finished when data received', () => {
            channelService.getChannelCategories.and.returnValue(of(<any>{pages: 1, page: 1, _embedded: {category: []}}));
            component.loadNextPage(event);
            expect(component.loadingNextPage).toBe(false);
        });

        it('should add categories from a new page to existing categories', () => {
            channelService.getChannelCategories.and.returnValue(of(<any>{
                pages: 1, page: 1, _embedded: {
                    category: [
                        {id: 3},
                        {id: 4},
                    ]
                }
            }));
            component.channelCategoryOptions = <any>[
                {id: 1},
                {id: 2},
            ];
            component.loadNextPage(event);
            expect(component.channelCategoryOptions).toEqual(<any>[
                {id: 1},
                {id: 2},
                {id: 3},
                {id: 4},
            ]);
        });

        it('should set hasNextPage to true if there are more pages', () => {
            component.currentPage = 1;
            channelService.getChannelCategories.and.returnValue(of(<any>{pages: 3, page: 1, _embedded: {category: []}}));
            component.loadNextPage(event);
            expect(component.hasNextPage).toBe(true);
        });

        it('should set hasNextPage to false if the last page is loaded', () => {
            component.currentPage = 2;
            channelService.getChannelCategories.and.returnValue(of(<any>{pages: 3, page: 3, _embedded: {category: []}}));
            component.loadNextPage(event);
            expect(component.hasNextPage).toBe(false);
        });

        it('should update the current page', () => {
            component.currentPage = 1;
            channelService.getChannelCategories.and.returnValue(of(<any>{pages: 3, page: 2, _embedded: {category: []}}));
            component.loadNextPage(event);
            expect(component.currentPage).toBe(2);
        });
    });
});

@Pipe({
    name: 'highlight'
})
class HighlightPipe implements PipeTransform {
    transform() {
        return '';
    }
}
