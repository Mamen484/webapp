import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchStoreComponent } from './search-store.component';
import { Directive, ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { MatAutocompleteModule } from '@angular/material';

@Directive({selector: '[sfaSearchStore]'})
export class SearchStoreMockDirective {
}

describe('SearchStoreComponent', () => {
    let elementRef: Object;
    let windowRef;

    let component: SearchStoreComponent;
    let fixture: ComponentFixture<SearchStoreComponent>;

    beforeEach(async(() => {
        elementRef = {};
        windowRef = {nativeWindow: jasmine.createSpyObj('Window', ['open'])};
        TestBed.configureTestingModule({
            imports: [MatAutocompleteModule],
            declarations: [SearchStoreComponent, SearchStoreMockDirective],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ElementRef, useValue: elementRef},
                {provide: SflWindowRefService, useValue: windowRef},
            ],
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchStoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should go to ?store={storeId} on selectStore call', () => {
        component.selectStore(295);
        expect(windowRef.nativeWindow.open).toHaveBeenCalledWith(`${environment.WEBAPP_URL}?store=295`);
    });

    it('should set processing to true on selectStore call', () => {
        component.processing = true;
        component.selectStore(295);
        expect(component.processing).toEqual(false);
    });

    it('should display a store name in the input when a store is selected', () => {
        expect(component.displayFn(<any>{id: 21, name: 'some name'})).toBe('some name');
    });

    it('should return undefined if displayFn is called without a store', () => {
        expect(component.displayFn(undefined)).not.toBeDefined();
    });

    it('should reset search on clearSearch call', () => {
        component.searchResults = [];
        component.searchControl.setValue('some value');
        component.clearSearch();
        expect(component.searchResults).not.toBeDefined();
        expect(component.searchControl.value).toBe(null);
    });

});
