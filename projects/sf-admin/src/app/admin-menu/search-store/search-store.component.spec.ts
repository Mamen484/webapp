import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { SearchStoreComponent } from './search-store.component';
import { Directive, ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';

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

    it('should go to ?store={storeId} on selectStore call', fakeAsync(() => {
        component.selectStore(295);
        expect(windowRef.nativeWindow.open).toHaveBeenCalledWith(`${environment.WEBAPP_URL}?store=295`);
    }));

    it('should set processing to true on selectStore call', fakeAsync(() => {
        component.processing = true;
        component.selectStore(295);
        expect(component.processing).toEqual(false);
    }));

});
