import { async, fakeAsync, ComponentFixture, inject, TestBed, tick } from '@angular/core/testing';
import { SearchStoreComponent } from './search-store.component';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreService } from '../../core/services/store.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BlankComponent } from '../../shared/blank.component';
import { Observable, EMPTY } from 'rxjs';
import { Location } from '@angular/common';

describe('SearchStoreComponent', () => {
    let elementRef: Object;
    let storeService: jasmine.SpyObj<StoreService>;

    let component: SearchStoreComponent;
    let fixture: ComponentFixture<SearchStoreComponent>;

    beforeEach(async(() => {
        elementRef = {};
        storeService = jasmine.createSpyObj(['fetchAvailableStores']);
        TestBed.configureTestingModule({
            declarations: [SearchStoreComponent, BlankComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ElementRef, useValue: elementRef},
                {provide: StoreService, useValue: storeService},
                Location,
            ],
            imports: [RouterTestingModule.withRoutes([
                {path: '', component: BlankComponent}])]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchStoreComponent);
        component = fixture.componentInstance;
        storeService.fetchAvailableStores.and.returnValue(EMPTY);
        fixture.detectChanges();
    });

    it('should go to ?store={storeId} on selectStore call', fakeAsync(() => {
        let location: Location = TestBed.get(Location);
        component.selectStore(295);
        tick();
        expect(location.path()).toEqual('?store=295');
    }));

    it('should set processing to true on selectStore call', fakeAsync(() => {
        expect(component.processing).toEqual(false);
        component.selectStore(295);
        expect(component.processing).toEqual(true);
    }));

    it ('should start search when 2 symbols entered after debounce time', fakeAsync(() => {
        component.searchControl.setValue('ab', {emitEvent: true});
        tick(100);
        expect(storeService.fetchAvailableStores).not.toHaveBeenCalled();
        tick(200);
        expect(storeService.fetchAvailableStores).toHaveBeenCalledTimes(1);
    }));

    it ('should NOT start search when no symbols entered', fakeAsync(() => {
        component.searchControl.setValue('', {emitEvent: true});
        tick(300);
        expect(storeService.fetchAvailableStores).not.toHaveBeenCalled();
    }));

    it ('should NOT start search when only one symbol entered', fakeAsync(() => {
        component.searchControl.setValue('', {emitEvent: true});
        tick(300);
        expect(storeService.fetchAvailableStores).not.toHaveBeenCalled();
    }));

});
